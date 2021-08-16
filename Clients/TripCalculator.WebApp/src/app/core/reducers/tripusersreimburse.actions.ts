import { Action } from '@ngrx/store';
import { ITrip, ITripUserReimburse } from '../models';

export const SET_TRIPSUSERSREIMMBURSESALL = '[TripUserReimburses] Set TripsUsersReimburses All';
export const SET_TRIPSUSERSREIMBURSES = '[TripUserReimburses] Set TripUserReimburses';
export const ADD_TRIPUSERREIMBURSE = '[TripUserReimburses] Add TripUserReimburse';
export const MODIFY_TRIPUSERREIMBURSE = '[TripUserReimburses] Modify TripUserReimburse';
export const DELETE_TRIPUSERREIMBURSE = '[TripUserReimburses] Delete TripUserReimburse';

export class SetTripUserReimbursesAll implements Action {
    readonly type = SET_TRIPSUSERSREIMMBURSESALL;

    constructor(public tripUserReimburses: ITripUserReimburse[]) {
    }
}

export class SetTripUserReimburses implements Action {
    readonly type = SET_TRIPSUSERSREIMBURSES;

    constructor(public tripUserReimburses: ITripUserReimburse[]) {
    }
}

export class AddTripUserReimburse implements Action {
    readonly type = ADD_TRIPUSERREIMBURSE;

    constructor(public tripUserReimburse: ITripUserReimburse) {
    }
}

export class ModifyTripUserReimburse implements Action {
    readonly type = MODIFY_TRIPUSERREIMBURSE;

    constructor(public tripUserReimburse: ITripUserReimburse) {
    }
}

export class DeleteTripUserReimburse implements Action {
    readonly type = DELETE_TRIPUSERREIMBURSE;

    constructor(public id: string) {
    }
}

export type AllTripUserReimburseActions
    = SetTripUserReimbursesAll
    | SetTripUserReimburses
    | AddTripUserReimburse
    | ModifyTripUserReimburse
    | DeleteTripUserReimburse;