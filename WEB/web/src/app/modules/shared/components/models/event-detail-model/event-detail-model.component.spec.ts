import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailModelComponent } from './event-detail-model.component';

describe('EventDetailModelComponent', () => {
  let component: EventDetailModelComponent;
  let fixture: ComponentFixture<EventDetailModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
