import { IRequest, IRequestUpdate } from "src/app/core";

export interface IUserCreateRequest extends IRequest {
    username: string;
}

export interface IUserUpdateRequest extends IRequestUpdate {
    username: string;
}