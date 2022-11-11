import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExperienceEditModelComponent } from './profile-experience-edit-model.component';

describe('ProfileExperienceEditModelComponent', () => {
  let component: ProfileExperienceEditModelComponent;
  let fixture: ComponentFixture<ProfileExperienceEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExperienceEditModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExperienceEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
