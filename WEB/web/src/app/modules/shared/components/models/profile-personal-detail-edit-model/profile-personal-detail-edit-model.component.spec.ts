import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalDetailEditModelComponent } from './profile-personal-detail-edit-model.component';

describe('ProfilePersonalDetailEditModelComponent', () => {
  let component: ProfilePersonalDetailEditModelComponent;
  let fixture: ComponentFixture<ProfilePersonalDetailEditModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePersonalDetailEditModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePersonalDetailEditModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
