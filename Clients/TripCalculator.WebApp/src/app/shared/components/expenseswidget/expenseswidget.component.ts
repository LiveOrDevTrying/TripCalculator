import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState, IExpense } from 'src/app/core';
import { ExpenseService, IExpenseCreateRequest, IExpenseVM } from '../../services';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-expenseswidget',
  templateUrl: './expenseswidget.component.html',
  styleUrls: ['./expenseswidget.component.scss']
})
export class ExpenseswidgetComponent extends BaseComponent implements OnInit {
  @Input() tripUserId: string;
  @Input() canCreateExpense = false;
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

  expensesTripUser: IExpense[] = [];

  $expenseCreateSubscription: Subscription;

  constructor(protected store: Store<AppState>,
    protected expenseService: ExpenseService,
    protected toastrService: ToastrService) {
    super(store);

    this.$expenseCreateSubscription = this.expenseService
      .getCreateExpense()
      .subscribe((x: IExpenseVM) => {
        if (x) {
          this.expenseDate = undefined;
          this.expenseLocation = undefined;
          this.expenseAmount = undefined;
        } else {
          this.toastrService.error('Could not create expense. Please try again later.');
        }
      });
  }

  ngOnInit() {
    this.afterAssignExpenses();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$expenseCreateSubscription.unsubscribe();
  }

  rowClickedEvent(expense: IExpense) {
    this.expenseClicked.next(expense);
  }

  afterAssignExpenses() {
    this.expensesTripUser = this.getExpenses(this.tripUserId);
    this.expenseTotal = this.getExpensesTotalForTripUser(this.tripUserId);
  }

  saveExpense() {
    const request: IExpenseCreateRequest = {
      timestampTransaction: this.expenseDate,
      location: this.expenseLocation,
      amount: this.expenseAmount,
      tripUserId: this.tripUserId
    }

    this.expenseService.createExpense(request);
  }

  removeExpense(id: string) {
    this.expenseService.deleteExpense(id);
  }
}
