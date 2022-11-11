import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSkillsModelComponent } from './profile-skills-model.component';

describe('ProfileSkillsModelComponent', () => {
  let component: ProfileSkillsModelComponent;
  let fixture: ComponentFixture<ProfileSkillsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSkillsModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSkillsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
