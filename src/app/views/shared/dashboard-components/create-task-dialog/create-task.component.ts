import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InternalDashboardService } from '../../../../services/internal-dashboard.service';
import { DiagnosticsService } from '../../../../services/diagnostics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    AppMaterialModule,
  ],
})
export class CreateTaskDialogComponent {
  // Read-only context fields — resolved from whichever caller's data shape is
  // passed in (diagnostics-new's child diagnostic record, internal-dashboard-new's
  // two table row shapes, etc.), since each names the same concept differently.
  building: string = '';
  equipmentType: string = '';
  asset: string = '';
  relatedDiagnostic: string = '';
  achievableSavings: number | null = null;
  hasMissingParameters: boolean = false;

  description: string = '';
  expResDate: string = '';

  assignedTo: string = '0';
  status: string = 'InProgress';
  workOrderCategory: string = 'predictive';
  workOrderType: string = 'proactive';
  generateWorkOrder: boolean = false;

  userEmails: any;

  /** Set once the user attempts to save, so required-field errors only show after a first attempt */
  attemptedSave: boolean = false;

  @ViewChild('descInput') descInput!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private internalDashboardService: InternalDashboardService,
    private diagnosticsService: DiagnosticsService,
    private snackBar: MatSnackBar,
  ) {
    this.getUsers();

    const dataM: any = this.data?.data || {};

    // Prefill read-only context — different callers use different field names
    // for the same concept, so fall back across every known shape.
    this.building = dataM.BuildingName || dataM.location || '';
    this.equipmentType = dataM.EquipmentClassName || dataM.category || '';
    this.asset = dataM.EquipmentName || dataM.assetName || '';
    this.relatedDiagnostic = dataM.NotesSummary || dataM.summary || '';
    this.achievableSavings = this.resolveSavings(dataM);
    this.hasMissingParameters = !!dataM.HasMissingParameters;
    this.assignedTo = dataM.Assignee || '0';
  }

  /** Resolves the achievable-savings figure across known caller shapes (Cost vs acs), as a plain number */
  private resolveSavings(dataM: any): number | null {
    const raw = dataM.Cost ?? dataM.acs;
    if (raw === undefined || raw === null || raw === '') return null;
    const num = Number(raw);
    return isNaN(num) ? null : num;
  }

  /** "$8.2k"-style display, matching the abbreviation convention used elsewhere in the app */
  get achievableSavingsDisplay(): string {
    if (this.achievableSavings === null) return '';
    return `$${(this.achievableSavings / 1000).toFixed(1)}k`;
  }

  get isAssignedToInvalid(): boolean {
    return this.attemptedSave && !this.assignedTo;
  }

  get isStatusInvalid(): boolean {
    return this.attemptedSave && !this.status;
  }

  get isDueDateInvalid(): boolean {
    return this.attemptedSave && !this.expResDate;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.descInput?.nativeElement?.focus();
    }, 200);
  }

  close() {
    this.dialog.closeAll();
  }

  getUsers() {
    this.internalDashboardService.getUsers().subscribe((res: any) => {
      this.userEmails = res.data;
      console.log('userEmails', this.userEmails);
    });
  }

  getYesterdayDate(): string {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
  }

  /** Validates required fields (Assigned To, Status, Due Date), then submits if valid */
  save(): void {
    this.attemptedSave = true;
    if (!this.assignedTo || !this.status || !this.expResDate) {
      return;
    }
    this.createNewTask();
  }

  createNewTask() {
    const dataM = this.data?.data || {};
    console.log('Creating new task with data:', dataM, );
    let params: any = {
      data: [
        {
          // SourceSystemAEID: dataM.SourceSystemAEID || '',
          SourceSystemEID: dataM.SourceSystemEID || '',
          Interval: 'Daily',
          Status: this.status,
          AnalysisStartDate: this.getYesterdayDate(),
          Summary: this.description,
          ...(this.expResDate && { expResDate: this.expResDate }),
          Assignee: this.assignedTo === '0' ? 'No Assignee' : this.assignedTo,
        },
      ],
    };
    // console.log('Payload:', params.data);
    this.diagnosticsService.createNewTask(params).subscribe({
      next: (result: any) => {
        if (result.exception === null) {
          this.snackBar.open('Saved Successfully!', 'Dismiss', {
            duration: 3000,
          });
          this.close();
        }
      },
      error: (error: any) => {
        console.log('ERROR:', error);
        this.snackBar.open('Could not create task!', 'Dismiss', {
          duration: 3000,
        });
      },
    });
  }

  assigneeSearch = '';

  get filteredUserEmails() {
    if (!this.assigneeSearch) {
      return this.userEmails;
    }

    return this.userEmails.filter((x: any) =>
      x.Email.toLowerCase().includes(this.assigneeSearch.toLowerCase()),
    );
  }

  onAssigneeClosed() {
    this.assigneeSearch = '';
  }
}
