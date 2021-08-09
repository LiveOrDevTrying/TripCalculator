import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { AppState, IExpense } from 'src/app/core';
import { ExpenseService, IExpenseCreateRequest } from '../../services';
import { BaseComponent } from '../base/base.component';
import { IExpenseWidgetData } from '../models';

@Component({
  selector: 'app-expenseswidget',
  templateUrl: './expenseswidget.component.html',
  styleUrls: ['./expenseswidget.component.scss']
})
export class ExpenseswidgetComponent extends BaseComponent implements OnInit, OnDestroy {
  @Input() props: IExpenseWidgetData;
  @Input() propsChanged: Subject<any>;
  @Output() expenseClicked = new EventEmitter<IExpense>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'location',
    'timestamp',
    'amount'
  ];

  expenseDate: Date;
  expenseLocation: string;
  expenseAmount: number;
  expenseTotal: number;

  expenses: IExpense[] = [];

  $propsChangedSubscription: Subscription;

  constructor(protected store: Store<AppState>,
    protected expenseService: ExpenseService) {
    super(store);
  }

  ngOnInit() {
    this.$propsChangedSubscription = this.propsChanged
      .subscribe(x => {
        this.afterAssignExpenses();
      });
      
    this.afterAssignExpenses();
  }
  
  ngOnDestroy() {
    super.ngOnDestroy();
    this.$propsChangedSubscription.unsubscribe();
  }

  rowClickedEvent(expense: IExpense) {
    this.expenseClicked.next(expense);
  }

  afterAssignExpenses() {
    if (this.props) {
      this.expenseTotal = this.getExpensesTotalForTripUser(this.props.tripUserId);
    }
  }

  saveExpense() {
    const request: IExpenseCreateRequest = {
      timestampTransaction: this.expenseDate,
      location: this.expenseLocation,
      amount: this.expenseAmount,
      tripUserId: this.props.tripUserId
    }

    this.expenseService.createExpense(request);
  }

  removeExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }
}
