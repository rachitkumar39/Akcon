import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageuserlistComponent } from './messageuserlist.component';

describe('MessageuserlistComponent', () => {
  let component: MessageuserlistComponent;
  let fixture: ComponentFixture<MessageuserlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageuserlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageuserlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
