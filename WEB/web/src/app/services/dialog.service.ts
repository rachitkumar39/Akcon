import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CreatePostModelComponent } from '../modules';

@Injectable(
  { providedIn: "root" }
)
export class DialogService {
  open(CreatePostModelComponent: CreatePostModelComponent, arg1: { msg: string; }, arg2: { height: string; width: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor(public dialog: MatDialog
    ) { }

  public openDialog(component: ComponentType<any>, data: any, style = {}): MatDialogRef<any> {
    
    const _data = { data: data, ...style };
    const dialogRef = this.dialog.open(component, _data);
    return dialogRef;

  }
  

  public closeModal() {
    this.dialog.closeAll();
  }
}