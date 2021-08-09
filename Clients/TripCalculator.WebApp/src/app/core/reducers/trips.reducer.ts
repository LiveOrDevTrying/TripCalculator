import * as TripsActions from './trips.actions';
import { newState } from './app.reducer';
import { ITrip } from '../models';

export function tripsReducer(state: ITrip[] = [], action: TripsActions.AllTripActions) {
    switch (action.type) {
        case TripsActions.SET_TRIPS:
            return newState(state, action.trips);
        case TripsActions.ADD_TRIP:
            let addTripNewState = state.concat((<TripsActions.AddTrip>action).trip);
            addTripNewState = addTripNewState.sort((a, b) => {
                if (a.tripName > b.tripName) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return newState(state, addTripNewState);
        case TripsActions.MODIFY_TRIP:
            const modifiedTripNewState = (<TripsActions.ModifyTrip>action).trip;
            const tripToModify = state.filter(x => x.id === modifiedTripNewState.id)[0];
            const idxOfUpd = state.indexOf(tripToModify);
            const updateTripNewState = [
                ...state.slice(0, idxOfUpd),
                modifiedTripNewState,
                ...state.slice(idxOfUpd + 1, state.length)
            ];
            return updateTripNewState;
        case TripsActions.DELETE_TRIP:
            const idx = (<TripsActions.DeleteTrip>action).id;
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