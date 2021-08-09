export interface AppState {
    claims: any;
    users: IUser[];
}

export interface IBaseInterface {
    id: string;
}

export interface IPayload extends IBaseInterface {
    users: IUser[];
}

export interface IUser extends IBaseInterface {
    username: string;
}

export interface IRequest {
}

export interface IRequestUpdate extends IRequest {
    id: string;
}