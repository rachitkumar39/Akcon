import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-profile-personal-detail-edit-model',
  templateUrl: './profile-personal-detail-edit-model.component.html',
  styleUrls: [ './profile-personal-detail-edit-model.component.scss' ]
})
export class ProfilePersonalDetailEditModelComponent implements OnInit {
  firstName: any = {};
  lastName: any = {};
  education: any = {};
  organization: any = {};
  position: any = {};
  city: any = {};
  state: any = {};
  country: any = {};
  constructor(
    private dialogRef: MatDialogRef<ProfilePersonalDetailEditModelComponent>
  ) { }

  ngOnInit(): void {
  }
  closeMe() {
    this.dialogRef.close();
  }
  profileDetailEditForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    education: new FormControl(''),
    organization: new FormControl(''),
    position: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl('')
  });
  profileDeailEdit() {
    const Data = {
      firstName : this.profileDetailEditForm.value.firstName,
      lastName : this.profileDetailEditForm.value.lastName,
      education : this.profileDetailEditForm.value.education,
      organization : this.profileDetailEditForm.value.organization,
      position : this.profileDetailEditForm.value.position,
      city : this.profileDetailEditForm.value.city,
      state : this.profileDetailEditForm.value.state,
      country : this.profileDetailEditForm.value.country,
    }
    console.log(Data);
  }
}
