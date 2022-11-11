import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfilePhotoModelComponent } from './show-profile-photo-model.component';

describe('ShowProfilePhotoModelComponent', () => {
  let component: ShowProfilePhotoModelComponent;
  let fixture: ComponentFixture<ShowProfilePhotoModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProfilePhotoModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowProfilePhotoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
