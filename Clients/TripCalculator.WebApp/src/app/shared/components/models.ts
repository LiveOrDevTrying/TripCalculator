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

export interface ITripsWidgetData {
    title: string;
    canCreateTrip: boolean;
    trips: ITrip[];
}

export interface ITripUserWidgetData {
    trip: ITrip;
    canCreateTripUser: boolean;
    tripsUsers: ITripUser[];
}

export interface IExpenseWidgetData {
    tripUserId: string;
    canCreateExpense: boolean;
    expenses: IExpense[];
}