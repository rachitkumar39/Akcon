import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-skills-model',
  templateUrl: './profile-skills-model.component.html',
  styleUrls: ['./profile-skills-model.component.scss']
})
export class ProfileSkillsModelComponent implements OnInit {
  skill:any = {}
  constructor(
    private dialogRef : MatDialogRef<ProfileSkillsModelComponent>
  ) { }

  ngOnInit(): void {
  }
  closeMe() {
    this.dialogRef.close();
  }
  profileSkillsForm = new FormGroup({
    skill: new FormControl('')
  })
  profileSkills() {
    const skillData = {
      skill : this.profileSkillsForm.value.skill
    }
  console.log(skillData);

  }
}
