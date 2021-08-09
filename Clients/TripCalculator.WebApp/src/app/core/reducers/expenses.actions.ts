import { Action } from '@ngrx/store';
import { IExpense } from '../models';

export const SET_EXPENSES = '[Expenses] Set Expenses';
export const ADD_EXPENSE = '[Expenses] Add Expense';
export const MODIFY_EXPENSE = '[Expenses] Modify Expense';
export const DELETE_EXPENSE = '[Expenses] Delete Expense';

export class SetExpenses implements Action {
    readonly type = SET_EXPENSES;

    constructor(public expenses: IExpense[]) {
    }
}

export class AddExpense implements Action {
    readonly type = ADD_EXPENSE;

    constructor(public expense: IExpense) {
    }
}

export class ModifyExpense implements Action {
    readonly type = MODIFY_EXPENSE;

    constructor(public expense: IExpense) {
    }
}

export class DeleteExpense implements Action {
    readonly type = DELETE_EXPENSE;

    constructor(public id: string) {
    }
}

export type AllExpenseActions
    = SetExpenses
    | AddExpense
    | ModifyExpense
    | DeleteExpense;