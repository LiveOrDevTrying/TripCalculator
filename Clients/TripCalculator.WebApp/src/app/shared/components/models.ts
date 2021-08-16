import { IExpense, ITrip, ITripUser, IUser } from "src/app/core";

export interface IConfirmationModalData {
    title: string;
    message: string;
    isConfirmed: boolean;
    cancelMessage: string;
    confirmMessage: string;
}

export interface IUsersWidgetData {
    title: string;
    canCreateUser: boolean;
    users: IUser[];
}