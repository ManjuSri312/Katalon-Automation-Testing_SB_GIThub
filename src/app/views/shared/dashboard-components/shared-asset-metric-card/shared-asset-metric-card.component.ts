import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-asset-metric-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './shared-asset-metric-card.component.html',
   styleUrls: ['./shared-asset-metric-card.component.scss'],
})
export class SharedAssetMetricCardComponent {
  @Input() title = '';
  @Input() tooltip = '';
  @Input() value: string | number | null | undefined = '';
  @Input() unit = '';
  @Input() valueClass = '';
  @Input() valueColor = '';
  @Input() stackValueExtra = false;
   @Input() showPoweredBy = true;

  get isValueNA(): boolean {
    return this.value === 'N/A';
  }
}
