import * as TripsusersreimbursesActions from './tripusersreimburse.actions';
import { newState } from './app.reducer';
import { ITripUserReimburse } from '../models';

export function tripsusersreimbursesReducer(state: ITripUserReimburse[] = [], action: TripsusersreimbursesActions.AllTripUserReimburseActions) {
    switch (action.type) {
        case TripsusersreimbursesActions.SET_TRIPSUSERSREIMMBURSESALL:
            return newState(state, action.tripUserReimburses);
        case TripsusersreimbursesActions.SET_TRIPSUSERSREIMBURSES:
            let newTripsUsersReimburse = (<TripsusersreimbursesActions.SetTripUserReimburses>action).tripUserReimburses;
            const nextState = state.filter(x => !newTripsUsersReimburse.find(t => t.tripUserId === x.tripUserId));
            return newState(nextState, newTripsUsersReimburse);
        case TripsusersreimbursesActions.ADD_TRIPUSERREIMBURSE:
            let addTripNewState = state.concat((<TripsusersreimbursesActions.AddTripUserReimburse>action).tripUserReimburse);
            return newState(state, addTripNewState);
        case TripsusersreimbursesActions.MODIFY_TRIPUSERREIMBURSE:
            const modifiedTripNewState = (<TripsusersreimbursesActions.ModifyTripUserReimburse>action).tripUserReimburse;
            const tripToModify = state.filter(x => x.id === modifiedTripNewState.id)[0];
            const idxOfUpd = state.indexOf(tripToModify);
            const updateTripNewState = [
                ...state.slice(0, idxOfUpd),
                modifiedTripNewState,
                ...state.slice(idxOfUpd + 1, state.length)
            ];
            return updateTripNewState;
        case TripsusersreimbursesActions.DELETE_TRIPUSERREIMBURSE:
            const idx = (<TripsusersreimbursesActions.DeleteTripUserReimburse>action).id;
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