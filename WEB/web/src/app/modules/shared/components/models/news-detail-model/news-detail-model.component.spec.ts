import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsDetailModelComponent } from './news-detail-model.component';

describe('NewsDetailModelComponent', () => {
  let component: NewsDetailModelComponent;
  let fixture: ComponentFixture<NewsDetailModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsDetailModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
