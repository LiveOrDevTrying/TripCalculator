import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripuserwidgetComponent } from './tripuserwidget.component';

describe('TripuserwidgetComponent', () => {
  let component: TripuserwidgetComponent;
  let fixture: ComponentFixture<TripuserwidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripuserwidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripuserwidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
