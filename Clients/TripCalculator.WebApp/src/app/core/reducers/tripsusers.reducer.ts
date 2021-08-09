import * as TripsusersActions from './tripsusers.actions';
import { newState } from './app.reducer';
import { ITripUser } from '../models';

export function tripsusersReducer(state: ITripUser[] = [], action: TripsusersActions.AllTripUserActions) {
    switch (action.type) {
        case TripsusersActions.SET_TRIPSUSERSALL:
            return newState(state, action.tripsUsers);
        case TripsusersActions.SET_TRIPSUSERS:
            let newTripsUsers = (<TripsusersActions.SetTripsUsers>action).tripsUsers;
            const nextState = state.filter(x => !newTripsUsers.find(t => t.tripId === x.tripId));
            return newState(nextState, newTripsUsers);
        case TripsusersActions.ADD_TRIPSUSER:
            let addTripNewState = state.concat((<TripsusersActions.AddTripUser>action).tripUser);
            return newState(state, addTripNewState);
        case TripsusersActions.MODIFY_TRIPSUSER:
            const modifiedTripNewState = (<TripsusersActions.ModifyTripUser>action).tripUser;
            const tripToModify = state.filter(x => x.id === modifiedTripNewState.id)[0];
            const idxOfUpd = state.indexOf(tripToModify);
            const updateTripNewState = [
                ...state.slice(0, idxOfUpd),
                modifiedTripNewState,
                ...state.slice(idxOfUpd + 1, state.length)
            ];
            return updateTripNewState;
        case TripsusersActions.DELETE_TRIPSUSER:
            const idx = (<TripsusersActions.DeleteTripUser>action).id;
            const tripToDelete = state.filter(x => x.id === idx)[0];
            const idxOfDel = state.indexOf(tripToDelete);
            const deleteTripNewState = [
                ...state.slice(0, idxOfDel),
                ...state.slice(idxOfDel + 1, state.length)
            ]
            return deleteTripNewState;
        default:
            return state;
    }
}