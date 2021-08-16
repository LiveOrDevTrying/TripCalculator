import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AddExpense, AppState, DeleteExpense, GlobalsService, ModifyExpense, SetTripUserReimburses } from 'src/app/core';
import { IExpenseCreateRequest, IExpenseUpdateRequest, IExpenseVM } from './models';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  $expenseCreateSubject = new Subject<IExpenseVM>();
  $expenseUpdateSubject = new Subject<IExpenseVM>();
  $expenseDeleteSubject = new Subject<boolean>();

  constructor(protected httpClient: HttpClient,
    protected globalsService: GlobalsService,
    protected store: Store<AppState>) { }
    
  createExpense(request: IExpenseCreateRequest) {
    this.httpClient.post<IExpenseVM>(`${this.globalsService.webapiUri}/expenses`, request)
      .subscribe((expenseVM: IExpenseVM) => {
        if (expenseVM) {
          this.store.dispatch(new AddExpense(expenseVM.dto));
          this.store.dispatch(new SetTripUserReimburses(expenseVM.tripUsersReimburse));
        }

        this.$expenseCreateSubject.next(expenseVM);
      });
  }

  updateExpense(request: IExpenseUpdateRequest) {
    this.httpClient.put<IExpenseVM>(`${this.globalsService.webapiUri}/expenses/${request.id}`, request)
      .subscribe((expenseVM: IExpenseVM) => {
        if (expenseVM) {
          this.store.dispatch(new ModifyExpense(expenseVM.dto));
          this.store.dispatch(new SetTripUserReimburses(expenseVM.tripUsersReimburse));
        }

        this.$expenseUpdateSubject.next(expenseVM);
      });
  }

  deleteExpense(id: string) {
    this.httpClient.delete<HttpResponse<any>>(`${this.globalsService.webapiUri}/expenses/${id}`, {observe : 'response'})
      .subscribe((response: HttpResponse<any>) => {
        if (response.ok) {
          this.store.dispatch(new DeleteExpense(id));
        }

        this.$expenseDeleteSubject.next(response.ok)
      })
  }

  getCreateExpense(): Observable<IExpenseVM> {
    return this.$expenseCreateSubject.asObservable();
  }

  getUpdateExpense(): Observable<IExpenseVM> {
    return this.$expenseUpdateSubject.asObservable();
  }

  getDeleteExpense(): Observable<boolean> {
    return this.$expenseDeleteSubject.asObservable();
  }
}
