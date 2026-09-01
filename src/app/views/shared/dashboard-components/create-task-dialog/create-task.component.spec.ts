import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskDialogComponent } from './create-task.component';

describe('CreateTaskDialogComponent', () => {
  let component: CreateTaskDialogComponent;
  let fixture: ComponentFixture<CreateTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaskDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTaskDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
