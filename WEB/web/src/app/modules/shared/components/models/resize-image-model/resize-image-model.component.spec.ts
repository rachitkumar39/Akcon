import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizeImageModelComponent } from './resize-image-model.component';

describe('ResizeImageModelComponent', () => {
  let component: ResizeImageModelComponent;
  let fixture: ComponentFixture<ResizeImageModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizeImageModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizeImageModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
