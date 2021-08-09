import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseswidgetComponent } from './expenseswidget.component';

describe('ExpenseswidgetComponent', () => {
  let component: ExpenseswidgetComponent;
  let fixture: ComponentFixture<ExpenseswidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseswidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
