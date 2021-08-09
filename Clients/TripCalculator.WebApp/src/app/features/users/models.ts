import { IRequest, IRequestUpdate } from "../models";

export interface IUserCreateRequest extends IRequest {
    username: string;
}

export interface IUserUpdateRequest extends IRequestUpdate {
    username: string;
}