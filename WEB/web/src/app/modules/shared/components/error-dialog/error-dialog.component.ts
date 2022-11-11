import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public  dialogRef: MatDialogRef<ErrorDialogComponent>,
    ) { 
      this.dialogRef.disableClose = true;
    }

  ngOnInit(): void {
    this.dialogRef.addPanelClass('error-dialog');
  }

  close(){
    this.dialogRef.close();
  }


}
