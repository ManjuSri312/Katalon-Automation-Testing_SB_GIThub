export interface ExportOption {
  label: string;
  value: string;
}

export const EXPORT_OPTIONS: ExportOption[] = [
  { label: 'PNG', value: 'PNG' },
  { label: 'PDF', value: 'PDF' },
  { label: 'CSV', value: 'CSV' }
];