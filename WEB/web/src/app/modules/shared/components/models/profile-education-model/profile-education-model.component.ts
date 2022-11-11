import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-education-model',
  templateUrl: './profile-education-model.component.html',
  styleUrls: ['./profile-education-model.component.scss']
})
export class ProfileEducationModelComponent implements OnInit {
  collegeName:any = {}
  educationType:any = {}
  educationName:any = {}
  startYear:any = {}
  endYear:any = {}

  constructor(
    private dialogRef: MatDialogRef<ProfileEducationModelComponent>
  ) { }

  ngOnInit(): void {
  }
  closeMe() {
    this.dialogRef.close();
  }
  profileEducationForm = new FormGroup({
    collegeName: new FormControl(''),
    educationType: new FormControl(''),
    educationName: new FormControl(''),
    startYear: new FormControl(''),
    endYear: new FormControl('')
  })
  profileEducation() {
    const educationData = {
      collegeName: this.profileEducationForm.value.collegeName,
      educationType: this.profileEducationForm.value.educationType,
      educationName: this.profileEducationForm.value.educationName,
      startYear: this.profileEducationForm.value.startYear,
      endYear: this.profileEducationForm.value.endYear
    }
    console.log(educationData);
  }
}
