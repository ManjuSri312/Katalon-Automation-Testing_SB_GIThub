import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.scss']
})
export class ExportMenuComponent {

  @Output() exportSelected = new EventEmitter<string>();

   toggleExportMenu(event: Event) {
    event.stopPropagation();
    this.exportMenuOpen = !this.exportMenuOpen;
  }





  exportMenuOpen = false;
  selectedFormat = 'PNG'; // default selected

  selectExport(type: string): void {

  this.selectedFormat = type;

  this.exportSelected.emit(type);

  this.exportMenuOpen = false;
}
}