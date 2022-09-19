import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSubmissionComponent } from './trainer-submission.component';

describe('TrainerSubmissionComponent', () => {
  let component: TrainerSubmissionComponent;
  let fixture: ComponentFixture<TrainerSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
