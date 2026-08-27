import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import moment from 'moment';

/**
 * One row of the M&V (Measurement & Verification) monthly export sheet.
 * Columns A-J (report_month..task_status) are pre-populated from PdM/
 * Clockworks/BMS/CMMS task data — asset_id maps to the row's EquipmentId;
 * columns K,L,O,P,S,T,U,V are left blank for manual M&V review; columns
 * M,N,Q,R,W are left blank for server-side recalculation.
 */
export interface MvExportRow {
  report_month: string;
  client_account: string;
  site_id: string;
  building_name: string;
  task_id: string;
  asset_id: string;
  asset_name: string;
  diagnostic_summary: string;
  system_estimated_annual_savings: string;
  task_status: string;
  mv_result: string;
  mv_adjusted_savings: string;
  verified_annual_savings: string;
  realization_factor: string;
  mv_method: string;
  primary_gap: string;
  gap_impact_dollar: string;
  gap_impact_percent: string;
  data_confidence_score: string;
  publish_status: string;
  mv_notes: string;
  reviewer_status: string;
  validation_flag: string;
}

/** Column order (A→W) and the exact header labels rendered in sheet row 4. */
export const MV_EXPORT_COLUMNS: { key: keyof MvExportRow; label: string }[] = [
  { key: 'report_month', label: 'Report Month' },
  { key: 'client_account', label: 'Client Account' },
  { key: 'site_id', label: 'Site ID' },
  { key: 'building_name', label: 'Building Name' },
  { key: 'task_id', label: 'Task ID' },
  { key: 'asset_id', label: 'Asset ID' },
  { key: 'asset_name', label: 'Asset Name' },
  { key: 'diagnostic_summary', label: 'Diagnostic Summary' },
  { key: 'system_estimated_annual_savings', label: 'System Estimated Annual Savings' },
  { key: 'task_status', label: 'Task Status' },
  { key: 'mv_result', label: 'M&V Result' },
  { key: 'mv_adjusted_savings', label: 'M&V Adjusted Savings' },
  { key: 'verified_annual_savings', label: 'Verified Annual Savings' },
  { key: 'realization_factor', label: 'Realization Factor' },
  { key: 'mv_method', label: 'M&V Method' },
  { key: 'primary_gap', label: 'Primary Gap' },
  { key: 'gap_impact_dollar', label: 'Gap Impact ($)' },
  { key: 'gap_impact_percent', label: 'Gap Impact (%)' },
  { key: 'data_confidence_score', label: 'Data Confidence Score (0-100)' },
  { key: 'publish_status', label: 'Publish Status' },
  { key: 'mv_notes', label: 'M&V Notes' },
  { key: 'reviewer_status', label: 'Reviewer Status' },
  { key: 'validation_flag', label: 'Validation Flag' },
];

const MV_EXPORT_HEADER_LABELS = MV_EXPORT_COLUMNS.map((c) => c.label);

const TITLE_TEXT = 'M&V Monthly Input - Pre-populated diagnostics with M&V approval fields';
const LEGEND_TEXT =
  'Gray fields should be populated by the system from FDD, CMMS, asset profile and utility data. ' +
  'M&V only reviews the yellow input fields; green fields are calculated and should be recalculated server-side.';

const TITLE_FILL: ExcelJS.FillPattern = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };
const HEADER_FILL: ExcelJS.FillPattern = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E96' } };

/** Data-row column-group banding, per the legend: gray = system/site fields,
 *  no fill = other system-populated fields, yellow = M&V manual inputs,
 *  green = calculated/server-recalculated fields. Groups are non-contiguous
 *  (e.g. M&V inputs at K,L then again at O,P), so membership is looked up
 *  by 1-based column index rather than a simple range check. */
const GRAY_FILL: ExcelJS.FillPattern = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD9D9D9' } };
const YELLOW_FILL: ExcelJS.FillPattern = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF2CC' } };
const GREEN_FILL: ExcelJS.FillPattern = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD8EAD3' } };
const RED_FILL: ExcelJS.FillPattern = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF4CCCC' } };

const GRAY_COLS = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // Report Month, Client Account, Site ID, Building Name, Task ID, Asset ID, Asset Name, Diagnostic Summary, System Estimated Annual Savings, Task Status
const YELLOW_COLS = new Set([11, 12, 15, 16, 19, 20, 21, 22]); // M&V Result, M&V Adjusted Savings, M&V Method, Primary Gap, Data Confidence Score, Publish Status, M&V Notes, Reviewer Status
const GREEN_COLS = new Set([13, 14, 17, 18, 23]); // Verified Annual Savings, Realization Factor, Gap Impact ($/%), Validation Flag
const VALIDATION_FLAG_COL = 23;

const THIN_BORDER: ExcelJS.Border = { style: 'thin', color: { argb: 'FF000000' } };
const ALL_BORDERS: Partial<ExcelJS.Borders> = {
  top: THIN_BORDER,
  left: THIN_BORDER,
  bottom: THIN_BORDER,
  right: THIN_BORDER,
};

/** Returns the data-row column-group fill for a 1-based column index (1=A..23=W), or undefined
 *  for no fill. The Validation Flag column overrides its base green fill with red when the
 *  value flags an error (e.g. "ERROR - Missing key"), so a bad row is visibly called out. */
function dataFillForColumn(colIndex: number, value?: string): ExcelJS.FillPattern | undefined {
  if (colIndex === VALIDATION_FLAG_COL && String(value ?? '').toUpperCase().startsWith('ERROR')) {
    return RED_FILL;
  }
  if (GRAY_COLS.has(colIndex)) return GRAY_FILL;
  if (YELLOW_COLS.has(colIndex)) return YELLOW_FILL;
  if (GREEN_COLS.has(colIndex)) return GREEN_FILL;
  return undefined;
}

/**
 * Filters taskdetailsData down to Completed rows and maps each into the
 * 23-field M&V export shape — M&V only reviews tasks the system has already
 * closed out. System-populated fields (columns A-J) are derived from the
 * task row and the currently-selected site; M&V input columns
 * (K,L,O,P,S,T,U,V) and calculated columns (M,N,Q,R,W) are left blank for
 * monthly review / server-side recalculation.
 */
export function buildMvExportRows(taskdetailsData: any[], siteId?: string | number): MvExportRow[] {
  const reportMonth = moment().format('YYYY-MM');

  return (taskdetailsData ?? [])
    .filter((row: any) => row.Status === 'Completed')
    .map((row: any) => {
      const taskId =
        row.ClientTaskID === null || row.ClientTaskID === undefined ? '' : 'TASK-' + row.ClientTaskID;
      const systemSavings =
        row.ACS === null || row.ACS === undefined || row.ACS === ''
          ? ''
          : Number.isFinite(Number(row.ACS))
            ? '$' + Number(row.ACS).toFixed(2)
            : '';

      return {
        report_month: reportMonth,
        client_account: row.unitName ?? '',
        site_id: siteId != null ? String(siteId) : '',
        building_name: row.BuildingName ?? '',
        task_id: taskId,
        asset_id: row.EquipmentId === null || row.EquipmentId === undefined ? '' : String(row.EquipmentId),
        asset_name: row.EquipmentName ?? '',
        diagnostic_summary: row.NotesSummary ?? row.Diagnostics?.NotesSummary ?? '',
        system_estimated_annual_savings: systemSavings,
        task_status: row.Status ?? '',
        mv_result: '',
        mv_adjusted_savings: '',
        verified_annual_savings: '',
        realization_factor: '',
        mv_method: '',
        primary_gap: '',
        gap_impact_dollar: '',
        gap_impact_percent: '',
        data_confidence_score: '',
        publish_status: '',
        mv_notes: '',
        reviewer_status: '',
        validation_flag: '',
      };
    });
}

/**
 * Builds the styled M&V workbook: title band (row 1), legend note (row 2),
 * blank spacer (row 3), header row (row 4, uniform navy fill), and one data
 * row per element of `rows` starting at row 5, with data cells banded per
 * the legend's gray/yellow/green column groups. Produces a valid
 * header-only workbook when `rows` is empty.
 */
export function buildMvWorkbook(rows: MvExportRow[]): ExcelJS.Workbook {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('M&V Export');
  const lastCol = MV_EXPORT_COLUMNS.length;
  const lastColLetter = sheet.getColumn(lastCol).letter;

  sheet.columns = MV_EXPORT_COLUMNS.map((column) => ({
    key: column.key,
    width: column.key === 'mv_notes' ? 40 : Math.max(column.label.length + 4, 16),
  }));

  // Row 1 — title band
  sheet.mergeCells(`A1:${lastColLetter}1`);
  const titleCell = sheet.getCell('A1');
  titleCell.value = TITLE_TEXT;
  titleCell.fill = TITLE_FILL;
  titleCell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Row 2 — legend note
  sheet.mergeCells(`A2:${lastColLetter}2`);
  const legendCell = sheet.getCell('A2');
  legendCell.value = LEGEND_TEXT;
  legendCell.font = { italic: true };
  legendCell.alignment = { horizontal: 'left', vertical: 'middle', wrapText: true };

  // Row 3 — blank spacer
  sheet.getRow(3).height = 6;

  // Row 4 — headers, uniform navy band across every column
  const headerRow = sheet.getRow(4);
  MV_EXPORT_COLUMNS.forEach((column, index) => {
    const cell = headerRow.getCell(index + 1);
    cell.value = column.label;
    cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = HEADER_FILL;
    cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  });

  // Data rows starting at row 5, banded per column group (gray/yellow/green/red)
  rows.forEach((row) => {
    const dataRow = sheet.addRow(MV_EXPORT_COLUMNS.map((column) => row[column.key]));
    MV_EXPORT_COLUMNS.forEach((column, index) => {
      const fill = dataFillForColumn(index + 1, row[column.key]);
      if (fill) dataRow.getCell(index + 1).fill = fill;
    });
  });

  // Thin borders on every cell across rows 1..(4 + rows.length), columns A-X
  const lastRow = 4 + rows.length;
  for (let rowIndex = 1; rowIndex <= lastRow; rowIndex++) {
    for (let colIndex = 1; colIndex <= lastCol; colIndex++) {
      sheet.getRow(rowIndex).getCell(colIndex).border = ALL_BORDERS;
    }
  }

  return workbook;
}

@Injectable({
  providedIn: 'root',
})
export class ExportMvXlsxService {
  async exportMvXlsx(
    taskdetailsData: any[],
    siteId?: string | number,
    fileName = 'M&V monthly two-phase template.xlsx',
  ): Promise<void> {
    const rows = buildMvExportRows(taskdetailsData, siteId);
    const workbook = buildMvWorkbook(rows);

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    saveAs(blob, fileName);
  }
}

export { MV_EXPORT_HEADER_LABELS };
