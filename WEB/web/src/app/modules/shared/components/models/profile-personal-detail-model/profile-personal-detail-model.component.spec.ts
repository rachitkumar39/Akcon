import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePersonalDetailModelComponent } from './profile-personal-detail-model.component';

describe('ProfilePersonalDetailModelComponent', () => {
  let component: ProfilePersonalDetailModelComponent;
  let fixture: ComponentFixture<ProfilePersonalDetailModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePersonalDetailModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePersonalDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
