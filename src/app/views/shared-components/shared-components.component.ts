import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedAssetMetricCardComponent } from '../shared/dashboard-components/shared-asset-metric-card/shared-asset-metric-card.component';
import { SharedMetricCardComponent } from '../shared/dashboard-components/shared-metric-card/shared-metric-card.component';
import { SharedMissingParameterCardComponent } from '../shared/dashboard-components/shared-missing-parameter-card/shared-missing-parameter-card.component';
import { CalculationMethodologyPopupComponent } from '../shared/dashboard-components/calculation-methodology-popup/calculation-methodology-popup.component';
import { CreateTaskDialogComponent } from '../shared/dashboard-components/create-task-dialog/create-task.component';
import { TaskDetailsModalComponent } from '../shared/dashboard-components/task-details-modal/task-details-modal.component';



interface ComponentCard {
  name: string;
  description: string;
  kind: 'metric' | 'asset' | 'missing' | 'breadcrumb' | 'export' | 'csv' | 'calculation' | 'create-task' | 'task-detail';
  related: string[];
}

@Component({
  selector: 'app-shared-components',
  standalone: true,
  imports: [
    MatDialogModule,
    SharedAssetMetricCardComponent,
    SharedMetricCardComponent,
    SharedMissingParameterCardComponent,
  ],
  templateUrl: './shared-components.component.html',
  styleUrl: './shared-components.component.scss'
})
export class SharedComponentsComponent {
  constructor(private dialog: MatDialog) {}

  readonly cards: ComponentCard[] = [
    { name: 'Metric card', description: 'Compact KPI card for counts, statuses, and operational totals.', kind: 'metric', related: ['SharedMetricCardComponent', 'NumberFormatPipe'] },
    { name: 'Asset metric card', description: 'Savings-focused KPI card with currency, units, and footer content.', kind: 'asset', related: ['SharedAssetMetricCardComponent', 'CountBadge', 'MetricFooter'] },
    { name: 'Missing parameter card', description: 'Highlights incomplete inputs and their impact on asset coverage.', kind: 'missing', related: ['SharedMissingParameterCardComponent', 'CriticalTab', 'VarianceImpact'] },
    { name: 'Breadcrumb', description: 'A consistent contextual navigation trail with a back action.', kind: 'breadcrumb', related: ['BreadcrumbComponent', 'RouterModule'] },
    { name: 'Export menu', description: 'A compact action menu for choosing a report export format.', kind: 'export', related: ['ExportMenuComponent', 'ExportCsvComponent'] },
    { name: 'CSV export', description: 'A focused action for downloading table data as a CSV file.', kind: 'csv', related: ['ExportCsvComponent', 'file-saver'] },
    { name: 'Calculations & methodology', description: 'A detailed breakdown of M&V methodology, data sources, and savings calculations for an asset.', kind: 'calculation', related: ['CalculationMethodologyPopupComponent', 'MatDialog', 'MatTable'] },
    { name: 'Create task', description: 'A dialog for creating a new work order or task from a diagnostic or asset.', kind: 'create-task', related: ['CreateTaskDialogComponent', 'InternalDashboardService', 'DiagnosticsService'] },
    { name: 'Task detail', description: 'Displays and edits the full details of an existing task or work order.', kind: 'task-detail', related: ['TaskDetailsModalComponent', 'CreateTaskDialogComponent', 'InternalDashboardService'] },
  ];

  showAll = false;
  selected: ComponentCard | null = null;
  featuredStart = 0;

  /** Demo state for the "Missing parameter card" preview, so the All/Critical tab visibly changes what's shown. */
  missingParamsTab: 'all' | 'critical' = 'all';
  readonly missingParamsData = {
    all: { assetCount: 24, inputCount: 8, diagnosticCount: 3 },
    critical: { assetCount: 9, inputCount: 5, diagnosticCount: 2 },
  };

  get visibleCards(): ComponentCard[] {
    if (this.selected) return [this.selected];
    if (this.showAll) return this.cards;
    return this.cards.slice(this.featuredStart, this.featuredStart + 3);
  }

  select(card: ComponentCard): void {
    this.selected = this.selected === card ? null : card;
  }

  /** Cards backed by a real MatDialog-based component open the live popup instead of just showing the related list. */
  onPreviewClick(card: ComponentCard): void {
    switch (card.kind) {
      case 'calculation':
        this.openCalculationDemo();
        break;
      case 'create-task':
        this.openCreateTaskDemo();
        break;
      case 'task-detail':
        this.openTaskDetailDemo();
        break;
      default:
        this.select(card);
    }
  }

  openCalculationDemo(): void {
    this.dialog.open(CalculationMethodologyPopupComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'create-task-dialog',
      data: { EquipmentName: 'AHU-09' },
    });
  }

  openCreateTaskDemo(): void {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'create-task-dialog',
      data: {
        data: {
          BuildingName: 'LGP - HQ Tower',
          EquipmentClassName: 'Air Handling Unit',
          EquipmentName: 'AHU-09',
          NotesSummary: 'Simultaneous Heating/Cooling',
          Cost: 48000,
          HasMissingParameters: true,
          Assignee: '0',
        },
        prefilled: false,
      },
    });
  }

  openTaskDetailDemo(): void {
    this.dialog.open(TaskDetailsModalComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'create-task-dialog',
      data: {
        title: 'task',
        item: {
          ClientTaskID: 'TASK-1042',
          TaskStatus: 'InProgress',
          NotesSummary: 'Simultaneous Heating/Cooling',
          EquipmentName: 'AHU-09',
          EquipmentClassName: 'Air Handling Unit',
          AnnualAvoidableCost: 48000,
          HasMissingParameters: true,
          Assignee: 'alex.morgan@example.com',
          TaskCreatedDate: new Date().toISOString(),
          ExpectedResolutionDate: new Date().toISOString(),
        },
      },
    });
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
