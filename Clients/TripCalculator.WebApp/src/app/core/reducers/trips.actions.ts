import { Action } from '@ngrx/store';
import { ITrip } from '../models';

export const SET_TRIPS = '[Trips] Set Trips';
export const ADD_TRIP = '[Trips] Add Trip';
export const MODIFY_TRIP = '[Trips] Modify Trip';
export const DELETE_TRIP = '[Trips] Delete Trip';

export class SetTrips implements Action {
    readonly type = SET_TRIPS;

    constructor(public trips: ITrip[]) {
    }
}

export class AddTrip implements Action {
    readonly type = ADD_TRIP;

    constructor(public trip: ITrip) {
    }
}

export class ModifyTrip implements Action {
    readonly type = MODIFY_TRIP;

    constructor(public trip: ITrip) {
    }
}

export class DeleteTrip implements Action {
    readonly type = DELETE_TRIP;

    constructor(public id: string) {
    }
}

export type AllTripActions
    = SetTrips
    | AddTrip
    | ModifyTrip
    | DeleteTrip;