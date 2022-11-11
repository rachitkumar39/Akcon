import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-experience-model',
  templateUrl: './profile-experience-model.component.html',
  styleUrls: ['./profile-experience-model.component.scss']
})
export class ProfileExperienceModelComponent implements OnInit {
  companyName:any = {}
  currentlyWorkingHere:any = {}
  jobTitle:any = {}
  startYear:any = {}
  endYear:any = {}
  constructor(
    private dialogRef: MatDialogRef<ProfileExperienceModelComponent>
  ) { }

  ngOnInit(): void {
  }
  closeMe() {
    this.dialogRef.close();
  }
  profileExperienceForm = new FormGroup({
    companyName: new FormControl(''),
    currentlyWorkingHere: new FormControl(''),
    jobTitle: new FormControl(''),
    startYear: new FormControl(''),
    endYear: new FormControl(''),
  });
  profileExperience() {
    const experienceData = {
      companyName: this.profileExperienceForm.value.companyName,
      currentlyWorkingHere: this.profileExperienceForm.value.currentlyWorkingHere,
      jobTitle: this.profileExperienceForm.value.jobTitle,
      startYear: this.profileExperienceForm.value.startYear,
      endYear: this.profileExperienceForm.value.endYear
    }
    console.log(experienceData);
  }
}
