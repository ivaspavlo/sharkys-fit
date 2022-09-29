import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerPendingComponent } from './trainer-pending.component';

describe('TrainerPendingComponent', () => {
  let component: TrainerPendingComponent;
  let fixture: ComponentFixture<TrainerPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerPendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
