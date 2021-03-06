export interface AppState {
    claims: any;
    users: IUser[];
    trips: ITrip[];
    tripsUsers: ITripUser[];
    expenses: IExpense[];
}

export interface IBaseInterface {
    id: string;
}

export interface IPayload extends IBaseInterface {
    users: IUser[];
    trips: ITrip[];
    tripsUsers: ITripUser[];
    expenses: IExpense[];
}

export interface IUser extends IBaseInterface {
    username: string;
}

export interface ITrip extends IBaseInterface {
    tripName: string;
    tripStartDate: Date;
    tripEndDate: Date;
}

export interface ITripUser extends IBaseInterface {
    tripId: string;
    userId: string;
}

export interface IExpense extends IBaseInterface {
    tripUserId: string;
    location: string;
    amount: number;
    timestampTransaction: Date;
}