import { Action } from '@ngrx/store';
import { IUser } from '../models';

export const SET_USERS = '[Users] Set Users';
export const ADD_USER = '[Users] Add User';
export const MODIFY_USER = '[Users] Modify User';
export const DELETE_USER = '[Users] Delete User';

export class SetUsers implements Action {
    readonly type = SET_USERS;

    constructor(public users: IUser[]) {
    }
}

export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public user: IUser) {
    }
}

export class ModifyUser implements Action {
    readonly type = MODIFY_USER;

    constructor(public user: IUser) {
    }
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;

    constructor(public id: number) {
    }
}

export type AllUserActions
    = SetUsers
    | AddUser
    | ModifyUser
    | DeleteUser;