import { NgModule } from '@angular/core';
import { SharedMetricCardComponent } from './shared-metric-card/shared-metric-card.component';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task.component';
import { TaskDetailsModalComponent } from './task-details-modal/task-details-modal.component';

@NgModule({
  imports: [
    SharedMetricCardComponent,
    CreateTaskDialogComponent,
    TaskDetailsModalComponent,
  ],
  exports: [
    SharedMetricCardComponent,
    CreateTaskDialogComponent,
    TaskDetailsModalComponent,
  ],
})
export class SharedDashboardComponentsModule {}
