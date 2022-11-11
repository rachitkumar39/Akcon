import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEducationModelComponent } from './profile-education-model.component';

describe('ProfileEducationModelComponent', () => {
  let component: ProfileEducationModelComponent;
  let fixture: ComponentFixture<ProfileEducationModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEducationModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEducationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
