import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailModelComponent } from './post-detail-model.component';

describe('PostDetailModelComponent', () => {
  let component: PostDetailModelComponent;
  let fixture: ComponentFixture<PostDetailModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDetailModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
