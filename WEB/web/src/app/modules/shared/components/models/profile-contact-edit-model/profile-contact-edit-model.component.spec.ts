import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContactEditModelComponent } from './profile-contact-edit-model.component';

describe('ProfileContactEditModelComponent', () => {
  let component: ProfileContactEditModelComponent;
  let fixture: ComponentFixture<ProfileContactEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileContactEditModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileContactEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
