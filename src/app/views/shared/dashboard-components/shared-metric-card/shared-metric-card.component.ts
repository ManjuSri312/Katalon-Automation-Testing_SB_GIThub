import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-metric-card',
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './shared-metric-card.component.html',
  styleUrl: './shared-metric-card.component.scss',
  standalone:true,
})
export class SharedMetricCardComponent {
  @Input() title = '';
  @Input() tooltip = '';
  @Input() subtitle = '';
  @Input() value: string | number | null | undefined = '';
  @Input() unit = '';
  @Input() valueClass = '';
  @Input() valuePadding = '38px 0';
   @Input() showPoweredBy = true;
}
