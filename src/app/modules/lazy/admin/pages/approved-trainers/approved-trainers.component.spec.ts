import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedTrainersComponent } from './approved-trainers.component';

describe('ApprovedTrainersComponent', () => {
  let component: ApprovedTrainersComponent;
  let fixture: ComponentFixture<ApprovedTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedTrainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
