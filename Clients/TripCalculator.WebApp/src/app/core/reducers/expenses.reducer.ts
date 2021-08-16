import * as ExpensesActions from './expenses.actions';
import { newState } from './app.reducer';
import { IExpense } from '../models';

export function expensesReducer(state: IExpense[] = [], action: ExpensesActions.AllExpenseActions) {
    switch (action.type) {
        case ExpensesActions.SET_EXPENSES:
            return newState(state, action.expenses);
        case ExpensesActions.ADD_EXPENSE:
            let addExpenseNewState = state.concat((<ExpensesActions.AddExpense>action).expense);
            addExpenseNewState = addExpenseNewState.sort((a, b) => {
                if (a.timestampTransaction < b.timestampTransaction) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return newState(state, addExpenseNewState);
        case ExpensesActions.MODIFY_EXPENSE:
            const modifiedExpenseNewState = (<ExpensesActions.ModifyExpense>action).expense;
            const expenseToModify = state.filter(x => x.id === modifiedExpenseNewState.id)[0];
            const idxOfUpd = state.indexOf(expenseToModify);
            const updateExpenseNewState = [
                ...state.slice(0, idxOfUpd),
                modifiedExpenseNewState,
                ...state.slice(idxOfUpd + 1, state.length)
            ];
            return updateExpenseNewState;
        case ExpensesActions.DELETE_EXPENSE:
            const idx = (<ExpensesActions.DeleteExpense>action).id;
            const expenseToDelete = state.filter(x => x.id === idx)[0];
            const idxOfDel = state.indexOf(expenseToDelete);
            const deleteExpenseNewState = [
                ...state.slice(0, idxOfDel),
                ...state.slice(idxOfDel + 1, state.length)
            ]
            return deleteExpenseNewState;
        default:
            return state;
    }
}