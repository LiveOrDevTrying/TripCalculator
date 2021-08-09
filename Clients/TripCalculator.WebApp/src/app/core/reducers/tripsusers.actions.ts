import { Action } from '@ngrx/store';
import { ITripUser } from '../models';

export const SET_TRIPSUSERSALL = '[TripsUsers] Set TripsUsers All';
export const SET_TRIPSUSERS = '[TripsUsers] Set TripsUsers';
export const ADD_TRIPSUSER = '[TripsUsers] Add Trip';
export const MODIFY_TRIPSUSER = '[TripsUsers] Modify Trip';
export const DELETE_TRIPSUSER = '[TripsUsers] Delete Trip';

export class SetTripsUsersAll implements Action {
    readonly type = SET_TRIPSUSERSALL;

    constructor(public tripsUsers: ITripUser[]) {
    }
}

export class SetTripsUsers implements Action {
    readonly type = SET_TRIPSUSERS;

    constructor(public tripsUsers: ITripUser[]) {
    }
}

export class AddTripUser implements Action {
    readonly type = ADD_TRIPSUSER;

    constructor(public tripUser: ITripUser) {
    }
}

export class ModifyTripUser implements Action {
    readonly type = MODIFY_TRIPSUSER;

    constructor(public tripUser: ITripUser) {
    }
}

export class DeleteTripUser implements Action {
    readonly type = DELETE_TRIPSUSER;

    constructor(public id: string) {
    }
}

export type AllTripUserActions
    = SetTripsUsersAll
    | SetTripsUsers
    | AddTripUser
    | ModifyTripUser
    | DeleteTripUser;