import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripswidgetComponent } from './tripswidget.component';

describe('TripswidgetComponent', () => {
  let component: TripswidgetComponent;
  let fixture: ComponentFixture<TripswidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripswidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
