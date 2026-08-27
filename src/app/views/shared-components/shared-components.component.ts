import { Component } from '@angular/core';
import { SharedAssetMetricCardComponent } from '../shared/dashboard-components/shared-asset-metric-card/shared-asset-metric-card.component';
import { SharedMetricCardComponent } from '../shared/dashboard-components/shared-metric-card/shared-metric-card.component';
import { SharedMissingParameterCardComponent } from '../shared/dashboard-components/shared-missing-parameter-card/shared-missing-parameter-card.component';



interface ComponentCard {
  name: string;
  description: string;
  kind: 'metric' | 'asset' | 'missing' | 'breadcrumb' | 'export' | 'csv';
  related: string[];
}

@Component({
  selector: 'app-shared-components',
  standalone: true,
  imports: [
    SharedAssetMetricCardComponent,
    SharedMetricCardComponent,
    SharedMissingParameterCardComponent,
  ],
  templateUrl: './shared-components.component.html',
  styleUrl: './shared-components.component.scss'
})
export class SharedComponentsComponent {
  readonly cards: ComponentCard[] = [
    { name: 'Metric card', description: 'Compact KPI card for counts, statuses, and operational totals.', kind: 'metric', related: ['SharedMetricCardComponent', 'NumberFormatPipe'] },
    { name: 'Asset metric card', description: 'Savings-focused KPI card with currency, units, and footer content.', kind: 'asset', related: ['SharedAssetMetricCardComponent', 'CountBadge', 'MetricFooter'] },
    { name: 'Missing parameter card', description: 'Highlights incomplete inputs and their impact on asset coverage.', kind: 'missing', related: ['SharedMissingParameterCardComponent', 'CriticalTab', 'VarianceImpact'] },
    { name: 'Breadcrumb', description: 'A consistent contextual navigation trail with a back action.', kind: 'breadcrumb', related: ['BreadcrumbComponent', 'RouterModule'] },
    { name: 'Export menu', description: 'A compact action menu for choosing a report export format.', kind: 'export', related: ['ExportMenuComponent', 'ExportCsvComponent'] },
    { name: 'CSV export', description: 'A focused action for downloading table data as a CSV file.', kind: 'csv', related: ['ExportCsvComponent', 'file-saver'] },
  ];

  showAll = false;
  selected: ComponentCard | null = null;
  featuredStart = 0;

  get visibleCards(): ComponentCard[] {
    if (this.selected) return [this.selected];
    if (this.showAll) return this.cards;
    return this.cards.slice(this.featuredStart, this.featuredStart + 3);
  }

  select(card: ComponentCard): void {
    this.selected = this.selected === card ? null : card;
  }

  toggleAll(): void {
    this.selected = null;
    this.showAll = !this.showAll;
  }

  previousFeatured(): void {
    this.featuredStart = (this.featuredStart - 3 + this.cards.length) % this.cards.length;
  }

  nextFeatured(): void {
    this.featuredStart = (this.featuredStart + 3) % this.cards.length;
  }
}
