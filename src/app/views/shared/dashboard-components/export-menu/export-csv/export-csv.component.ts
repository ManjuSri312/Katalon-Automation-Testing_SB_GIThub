import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrl: './export-csv.component.scss',
})
export class ExportCsvComponent {

  @Input() data: any[] = [];
  @Input() fileName: string = 'export.csv';
@Input() columns: { key: string; label: string }[] = [];
exportCSV() {
  if (!this.data?.length || !this.columns?.length) return;

  const csv = this.convertToCSV(this.data, this.columns);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, this.fileName);
}
private convertToCSV(data: any[], columns: any[]): string {
  const headers = columns.map(c => c.label);

  const rows = data.map(row =>
    columns.map(col => {
      const value =
        row[col.key] === undefined ||
        row[col.key] === null
          ? ''
          : String(row[col.key]);

      return `"${value.replace(/"/g, '""')}"`;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}
private downloadFile(csv: string, fileName: string) {
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  saveAs(blob, fileName);
}
}