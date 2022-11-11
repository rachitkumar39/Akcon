import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperienceModelComponent } from './profile-experience-model.component';

describe('ProfileExperienceModelComponent', () => {
  let component: ProfileExperienceModelComponent;
  let fixture: ComponentFixture<ProfileExperienceModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExperienceModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperienceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
