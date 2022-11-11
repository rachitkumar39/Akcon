import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEducationEditModelComponent } from './profile-education-edit-model.component';

describe('ProfileEducationEditModelComponent', () => {
  let component: ProfileEducationEditModelComponent;
  let fixture: ComponentFixture<ProfileEducationEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEducationEditModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEducationEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
