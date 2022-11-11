import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillsEditModelComponent } from './profile-skills-edit-model.component';

describe('ProfileSkillsEditModelComponent', () => {
  let component: ProfileSkillsEditModelComponent;
  let fixture: ComponentFixture<ProfileSkillsEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSkillsEditModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSkillsEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
