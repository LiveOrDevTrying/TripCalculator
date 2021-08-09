import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationModalData } from '../../models';

@Component({
  selector: 'app-confirmationmodal',
  templateUrl: './confirmationmodal.component.html',
  styleUrls: ['./confirmationmodal.component.scss']
})
export class ConfirmationmodalComponent {
  data = this.dataInstance;

  constructor(private dialogRef: MatDialogRef<ConfirmationmodalComponent>,
    @Inject(MAT_DIALOG_DATA) private dataInstance: IConfirmationModalData) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
