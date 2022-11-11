import { Component, ElementRef, OnInit } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, LoadedImage } from 'ngx-image-cropper';
import {  MatDialog, MatDialogRef,} from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-resize-image-model',
  templateUrl: './resize-image-model.component.html',
  styleUrls: ['./resize-image-model.component.scss']
})
export class ResizeImageModelComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  temp:boolean=false;
  scale = 1;
  transform: ImageTransform = {};
  constructor(
    private dialogService: DialogService,
    public dialog: MatDialog,
    public  dialogRef: MatDialogRef<ResizeImageModelComponent>,
  ) { }
  ngOnInit(): void {
  }
  closeMe() {
    this.dialogRef.close();
  }
  closeAll() {
    this.dialog.closeAll();
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.temp=true;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  cropperReady(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }
  saveimage()
  {
    this.dialogRef.close(this.croppedImage);
  }
}
