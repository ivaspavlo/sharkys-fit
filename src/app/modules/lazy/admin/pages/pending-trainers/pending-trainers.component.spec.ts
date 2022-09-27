import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTrainersComponent } from './pending-trainers.component';

describe('PendingTrainersComponent', () => {
  let component: PendingTrainersComponent;
  let fixture: ComponentFixture<PendingTrainersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTrainersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTrainersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
