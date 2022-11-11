import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactModelComponent } from './profile-contact-model.component';

describe('ProfileContactModelComponent', () => {
  let component: ProfileContactModelComponent;
  let fixture: ComponentFixture<ProfileContactModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContactModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContactModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
