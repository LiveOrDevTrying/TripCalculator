import { IBaseInterface, IExpense, ITripUserReimburse } from "src/app/core";
import { IRequest, IRequestUpdate } from "src/app/features";

export interface IExpenseCreateRequest extends IRequest {
    tripUserId: string;
    timestampTransaction: Date;
    location: string;
    amount: number;
}

export interface IExpenseUpdateRequest extends IRequestUpdate {
    timestampTransaction: Date;
    location: string;
    amount: number;
}

export interface IExpenseVM extends IBaseInterface {
    dto: IExpense;
    tripUsersReimburse: ITripUserReimburse[];
}