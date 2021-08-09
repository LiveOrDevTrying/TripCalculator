import { ITrip, IUser } from "src/app/core";

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