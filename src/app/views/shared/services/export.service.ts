import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { PdfSummary } from '../models/pdf-summary.model';
import { PdfTableConfig } from '../models/pdf-table-config.model';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  async exportToPng(element: HTMLElement, fileName = 'report') {
    const canvas = await html2canvas(element, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  // async exportAssetPdf(
  //   element: HTMLElement,
  //   tableData: any[],
  //   CriticalcountData: any,
  //   TotalpriorityscoreData: any,
  //   ResolutionTimeData:any,
  // ) {

  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   // =====================
  //   // PAGE 1 - SCREENSHOT
  //   // =====================

  //   const canvas = await html2canvas(element, {
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: '#ffffff'
  //   });

  //   const imgData = canvas.toDataURL('image/png');

  //   const pdfWidth = 210;
  //   const imgHeight =
  //     (canvas.height * pdfWidth) / canvas.width;

  //   pdf.addImage(
  //     imgData,
  //     'PNG',
  //     0,
  //     0,
  //     pdfWidth,
  //     imgHeight
  //   );

  //   // =====================
  //   // PAGE 2 - DATA
  //   // =====================

  //   pdf.addPage();

  //   pdf.setFontSize(18);
  //   pdf.text('Asset Health Leaderboard', 14, 20);

  //   pdf.setFontSize(12);

  //   pdf.text(
  //     `Total Assets: ${CriticalcountData?.data?.totalAssets?.[0]?.totalCount ?? 0}`,
  //     14,
  //     35
  //   );

  //   pdf.text(
  //     `End of RUL Count: ${ ResolutionTimeData ?? '--'}`,
  //     14,
  //     45
  //   );

  //  pdf.text(
  //   `Average Health Score: ${
  //     TotalpriorityscoreData?.data?.Data?.[0]?.score != null
  //       ? Math.round(TotalpriorityscoreData.data.Data[0].score)
  //       : 'N/A'
  //   }`,
  //   14,
  //   55
  // );

  //   pdf.text(
  //   `Total Critical Assets: ${
  //     CriticalcountData?.data?.CriticalCountPipeline?.[0]?.CriticalCount ?? 0
  //   }`,
  //   14,
  //   65
  // );

  //   autoTable(pdf, {
  //     startY: 70,

  //     head: [[
  //       'Asset',
  //       'Location',
  //       'Asset Count',
  //       'Avg Health Score',
  //       'Avg RUL',
  //       'Avg Fault Freq',
  //       'Total Diagnostics',
  //       'Total Critical Assets',
  //       'Criticality',
  //       'Actions'
  //     ]],

  //     body: tableData.map(row => [
  //       row.EquipmentClassName,
  //       row.BuildingName,
  //       row.AssetCount,
  //       row.AvgHealthScore,
  //       row.AvgRul,
  //       row.AvgFaultFrequency,
  //       row.TotalDiagnostics,
  //       row.TotalCriticalAssets,
  //       row.Criticality,
  //       row.Actions
  //     ])
  //   });

  //   pdf.save('Performance Page.pdf');
  // }

  async exportAssetPdf(
    element: HTMLElement,
    summaryData: PdfSummary[],
    tableConfig: PdfTableConfig,
  ) {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // =====================
    // PAGE 1 - SCREENSHOT
    // =====================

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);

    // =====================
    // PAGE 2 - DATA
    // =====================

    pdf.addPage();

    pdf.setFontSize(18);
    pdf.text('Asset Health Leaderboard', 14, 20);

    pdf.setFontSize(12);

    let yPosition = 35;

    summaryData.forEach((item) => {
      pdf.text(`${item.label}: ${item.value}`, 14, yPosition);

      yPosition += 10;
    });
    autoTable(pdf, {
      startY: 70,

      head: [tableConfig.headers],

      body: tableConfig.rows,
    });

    pdf.save('Performance Page.pdf');
  }

  async exportToPdf(
    element: HTMLElement,
    summaryData: PdfSummary[],
    fileName = 'Performance Page',
  ) {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Page 1 - Screenshot
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');

    const pdfWidth = 210;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, imgHeight);

    // Page 2 - Summary
    pdf.addPage();

    pdf.setFontSize(18);
    pdf.text('Performance Summary', 14, 20);

    pdf.setFontSize(12);

    let yPosition = 35;

    summaryData.forEach((item) => {
      pdf.text(`${item.label}: ${item.value}`, 14, yPosition);
      yPosition += 10;
    });

    pdf.save(`${fileName}.pdf`);
  }
}
