export interface AppState {
    claims: any;
    users: IUser[];
}

export interface IBaseInterface {
    id: number;
}

export interface IPayload extends IBaseInterface {
    users: IUser[];
}

export interface IUser extends IBaseInterface {
    username: string;
}