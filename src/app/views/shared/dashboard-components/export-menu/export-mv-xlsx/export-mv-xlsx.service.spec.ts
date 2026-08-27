import { TestBed } from '@angular/core/testing';
import moment from 'moment';

import {
  buildMvExportRows,
  buildMvWorkbook,
  MV_EXPORT_COLUMNS,
  MvExportRow,
  ExportMvXlsxService,
} from './export-mv-xlsx.service';

const BLANK_COLUMNS: (keyof MvExportRow)[] = [
  'mv_result',
  'mv_adjusted_savings',
  'verified_annual_savings',
  'realization_factor',
  'mv_method',
  'primary_gap',
  'gap_impact_dollar',
  'gap_impact_percent',
  'data_confidence_score',
  'publish_status',
  'mv_notes',
  'reviewer_status',
  'validation_flag',
];

const EXPECTED_HEADER_LABELS = [
  'Report Month',
  'Client Account',
  'Site ID',
  'Building Name',
  'Task ID',
  'Asset ID',
  'Asset Name',
  'Diagnostic Summary',
  'System Estimated Annual Savings',
  'Task Status',
  'M&V Result',
  'M&V Adjusted Savings',
  'Verified Annual Savings',
  'Realization Factor',
  'M&V Method',
  'Primary Gap',
  'Gap Impact ($)',
  'Gap Impact (%)',
  'Data Confidence Score (0-100)',
  'Publish Status',
  'M&V Notes',
  'Reviewer Status',
  'Validation Flag',
];

describe('buildMvExportRows', () => {
  it('includes only Completed rows, filtering out other statuses (In Progress, Open, ...)', () => {
    const rows = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed', BuildingName: 'B1' },
      { ClientTaskID: 2, Status: 'In Progress', BuildingName: 'B2' },
      { ClientTaskID: 3, Status: 'Open', BuildingName: 'B3' },
    ]);

    expect(rows.length).toBe(1);
    expect(rows.map((r) => r.task_status)).toEqual(['Completed']);
  });

  it('returns an empty array when no rows are Completed', () => {
    const rows = buildMvExportRows([
      { ClientTaskID: 1, Status: 'In Progress' },
      { ClientTaskID: 2, Status: 'Open' },
    ]);

    expect(rows).toEqual([]);
  });

  it('maps task_id to TASK- prefixed ClientTaskID', () => {
    const [row] = buildMvExportRows([{ ClientTaskID: 4821, Status: 'Completed' }]);
    expect(row.task_id).toBe('TASK-4821');
  });

  it('stamps report_month as the current YYYY-MM', () => {
    const reportMonth = moment().format('YYYY-MM');
    const [row] = buildMvExportRows([{ ClientTaskID: 10, Status: 'Completed' }]);
    expect(row.report_month).toBe(reportMonth);
  });

  it('maps site_id from the passed-in siteId, not from the row', () => {
    const [row] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed' }], 'SITE-42');
    expect(row.site_id).toBe('SITE-42');
  });

  it('leaves site_id blank when no siteId is passed', () => {
    const [row] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed' }]);
    expect(row.site_id).toBe('');
  });

  it('maps client_account from unitName and asset_name from EquipmentName', () => {
    const [row] = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed', unitName: 'Acme Corp', EquipmentName: 'CH-02-AHU-02' },
    ]);
    expect(row.client_account).toBe('Acme Corp');
    expect(row.asset_name).toBe('CH-02-AHU-02');
  });

  it('maps asset_id from EquipmentId', () => {
    const [row] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed', EquipmentId: 9134 }]);
    expect(row.asset_id).toBe('9134');
  });

  it('leaves asset_id blank when EquipmentId is missing', () => {
    const [row] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed' }]);
    expect(row.asset_id).toBe('');
  });

  it('maps diagnostic_summary from NotesSummary, falling back to Diagnostics.NotesSummary', () => {
    const [direct] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed', NotesSummary: 'Direct note' }]);
    expect(direct.diagnostic_summary).toBe('Direct note');

    const [nested] = buildMvExportRows([
      { ClientTaskID: 2, Status: 'Completed', Diagnostics: { NotesSummary: 'Nested note' } },
    ]);
    expect(nested.diagnostic_summary).toBe('Nested note');
  });

  it('leaves system_estimated_annual_savings blank when ACS is null, undefined, or empty string', () => {
    const rows = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed', ACS: null },
      { ClientTaskID: 2, Status: 'Completed', ACS: undefined },
      { ClientTaskID: 3, Status: 'Completed', ACS: '' },
    ]);

    rows.forEach((row) => expect(row.system_estimated_annual_savings).toBe(''));
  });

  it('formats system_estimated_annual_savings as $X.XX when ACS is present, rounding to 2 decimals', () => {
    const [exact] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed', ACS: 100 }]);
    expect(exact.system_estimated_annual_savings).toBe('$100.00');

    const [rounded] = buildMvExportRows([{ ClientTaskID: 2, Status: 'Completed', ACS: 123.456 }]);
    expect(rounded.system_estimated_annual_savings).toBe('$123.46');
  });

  it('leaves system_estimated_annual_savings blank when ACS is a non-numeric value or NaN', () => {
    const [nonNumeric] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed', ACS: 'not-a-number' }]);
    expect(nonNumeric.system_estimated_annual_savings).toBe('');

    const [nan] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed', ACS: NaN }]);
    expect(nan.system_estimated_annual_savings).toBe('');
  });

  it('always leaves the M&V/calculated columns blank', () => {
    const rows = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed', ACS: 50, BuildingName: 'B', EquipmentName: 'E', NotesSummary: 'N' },
    ]);

    rows.forEach((row) => {
      BLANK_COLUMNS.forEach((key) => expect(row[key]).toBe(''));
    });
  });

  it('returns an empty array for empty input without throwing', () => {
    expect(() => buildMvExportRows([])).not.toThrow();
    expect(buildMvExportRows([])).toEqual([]);
  });

  it('does not throw when ClientTaskID is missing, leaving task_id blank', () => {
    expect(() => buildMvExportRows([{ Status: 'Completed' }])).not.toThrow();
    const [row] = buildMvExportRows([{ Status: 'Completed' }]);
    expect(row.task_id).toBe('');
  });

  it('treats ClientTaskID = 0 as present, producing TASK-0 (not the empty fallback)', () => {
    const [row] = buildMvExportRows([{ ClientTaskID: 0, Status: 'Completed' }]);
    expect(row.task_id).toBe('TASK-0');
  });
});

describe('buildMvWorkbook', () => {
  it('merges the title band (row 1) and legend note (row 2) across all 23 columns', () => {
    const workbook = buildMvWorkbook([]);
    const sheet = workbook.worksheets[0];

    expect(sheet.model.merges).toEqual(jasmine.arrayContaining(['A1:W1', 'A2:W2']));
  });

  it('renders the exact 23-label header row (row 4) in column order', () => {
    const workbook = buildMvWorkbook([]);
    const sheet = workbook.worksheets[0];

    const headerValues = MV_EXPORT_COLUMNS.map((_, index) => sheet.getRow(4).getCell(index + 1).value);
    expect(headerValues).toEqual(EXPECTED_HEADER_LABELS);
  });

  it('flags the Validation Flag cell (column W) red when its value starts with "ERROR"', () => {
    const rows: MvExportRow[] = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed' },
    ]);
    rows[0].validation_flag = 'ERROR - Missing key';

    const workbook = buildMvWorkbook(rows);
    const sheet = workbook.worksheets[0];

    const cell = sheet.getRow(5).getCell(23); // Validation Flag is column W (23rd)
    expect((cell.fill as any).fgColor.argb).toBe('FFF4CCCC');
  });

  it('fills the Validation Flag cell green when its value does not flag an error', () => {
    const rows: MvExportRow[] = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed' },
    ]);
    rows[0].validation_flag = 'OK';

    const workbook = buildMvWorkbook(rows);
    const sheet = workbook.worksheets[0];

    const cell = sheet.getRow(5).getCell(23);
    expect((cell.fill as any).fgColor.argb).toBe('FFD8EAD3');
  });

  it('fills Task ID, Asset ID, Asset Name, Diagnostic Summary, System Estimated Annual Savings, and Task Status gray like Building Name', () => {
    const rows: MvExportRow[] = buildMvExportRows([{ ClientTaskID: 1, Status: 'Completed' }]);
    const workbook = buildMvWorkbook(rows);
    const sheet = workbook.worksheets[0];
    const dataRow = sheet.getRow(5);

    // Columns: 4=Building Name, 5=Task ID, 6=Asset ID, 7=Asset Name,
    // 8=Diagnostic Summary, 9=System Estimated Annual Savings, 10=Task Status.
    [4, 5, 6, 7, 8, 9, 10].forEach((colIndex) => {
      expect((dataRow.getCell(colIndex).fill as any).fgColor.argb).toBe('FFD9D9D9');
    });
  });

  it('produces a valid header-only workbook with no data rows for empty input', () => {
    const workbook = buildMvWorkbook([]);
    const sheet = workbook.worksheets[0];

    // Row 5 (first data row) should not exist / be empty when there are no rows.
    const row5 = sheet.getRow(5);
    expect(row5.getCell(1).value).toBeNull();
  });

  it('writes one data row per element of rows, in column order, starting at row 5', () => {
    const rows: MvExportRow[] = buildMvExportRows([
      { ClientTaskID: 1, Status: 'Completed', BuildingName: 'B1', EquipmentName: 'E1' },
    ]);
    const workbook = buildMvWorkbook(rows);
    const sheet = workbook.worksheets[0];

    expect(sheet.getRow(5).getCell(5).value).toBe('TASK-1'); // task_id is column E (5th)
    expect(sheet.getRow(5).getCell(7).value).toBe('E1'); // asset_name is column G (7th)
  });
});

describe('ExportMvXlsxService', () => {
  let service: ExportMvXlsxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportMvXlsxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
