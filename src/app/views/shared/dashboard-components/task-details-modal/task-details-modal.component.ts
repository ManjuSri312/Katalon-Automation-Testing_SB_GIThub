import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InternalDashboardService } from '../../../../services/internal-dashboard.service';
// import { CreateTaskComponent } from 'app/views/Internal-dashboard/create-task/create-task.component';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task.component';

@Component({
  selector: 'app-task-details-dialog',
  imports: [AppMaterialModule, FormsModule, CommonModule],
  templateUrl: './task-details-modal.component.html',
  styleUrl: './task-details-modal.component.scss',
  standalone: true
})
export class TaskDetailsModalComponent implements OnInit {

  isEditMode = false;
  originalData: any = {};
  editableData: any = {};
  userEmails: any[] = [];
  assigneeSearch: string = '';
  cost: any;
  hasMissingParameters: boolean = false;
  title: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskDetailsModalComponent>,
    private internalDashboardService: InternalDashboardService,
    private dialog: MatDialog
  ) {
     this.getUsers();
  }

  ngOnInit() {


    let data = this.data.item
    this.title = this.data.title === 'task' ? true : false ;

    console.log('triggered')

    const annualAvoidableCost = Number(data.AnnualAvoidableCost);
    this.cost = Number.isFinite(annualAvoidableCost)
      ? `$${(annualAvoidableCost / 1000).toFixed(1)}k`
      : 'N/A';
    this.hasMissingParameters = !!data.HasMissingParameters;
    console.log( 'data' , this.data)
    this.originalData = { ...data };
    this.editableData = { ...data };
  }


  getUsers() {
    this.internalDashboardService.getUsers().subscribe((res: any) => {
      this.userEmails = res.data;
      console.log("userEmails",this.userEmails);
    });
  }

  enableEdit() {
    // this.isEditMode = true;  
    this.openCreateTask(this.originalData)
  }


    openCreateTask(item: any) {
      let prefilled = true;
      this.dialog.open(CreateTaskDialogComponent, {
        width: '600px',
        panelClass: 'create-task-dialog',
        data: { data: item , prefilled: prefilled},
        backdropClass: 'hello',
        autoFocus: true,
      });
    }

  cancelEdit() {
    this.editableData = { ...this.originalData }; // revert all changes
    this.isEditMode = false;
    this.assigneeSearch = '';
  }

  saveEdit() {
    const params: any = { data: [this.editableData] };

    this.internalDashboardService.updateTaskRows(params).subscribe({
      next: (res: any) => {
        if (res.exception === null) {
          this.originalData = { ...this.editableData };
          this.isEditMode = false;
          this.dialogRef.close(this.editableData);
        }
      },
      error: (err: any) => {
        console.error('Failed to update task', err);
      },
    });
  }

  get filteredUserEmails(): any[] {
    if (!this.assigneeSearch.trim()) return this.userEmails;
    return this.userEmails.filter((user: any) =>
      user.Email?.toLowerCase().includes(this.assigneeSearch.toLowerCase())
    );
  }

  onAssigneeClosed() {
    this.assigneeSearch = '';
  }
}
