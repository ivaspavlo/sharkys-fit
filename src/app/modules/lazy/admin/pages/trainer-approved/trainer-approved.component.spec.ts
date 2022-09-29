import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerApprovedComponent } from './trainer-approved.component';

describe('TrainerApprovedComponent', () => {
  let component: TrainerApprovedComponent;
  let fixture: ComponentFixture<TrainerApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
