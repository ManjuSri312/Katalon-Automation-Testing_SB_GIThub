import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-missing-parameter-card',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './shared-missing-parameter-card.component.html',
  styleUrl: './shared-missing-parameter-card.component.scss',
  standalone:true,
})
export class SharedMissingParameterCardComponent {
  @Input() title = '';
  @Input() assetCount = 0;
  // @Input() selectedTab: 'all' | 'critical' = 'all';
  @Input() inputCount = 0;
  @Input() diagnosticCount = 0;
  @Input() varianceImpact = '';
  @Input() tooltip = '';
  @Input() assetLabel: string = 'assets';
  @Input() selectedTab: 'all' | 'critical' = 'all';
  @Input() showDiagnosticPill: boolean = true;

@Output() selectedTabChange = new EventEmitter<'all' | 'critical'>();

onTabChange(tab: 'all' | 'critical') {
  this.selectedTab = tab;
  this.selectedTabChange.emit(tab);
}
}
