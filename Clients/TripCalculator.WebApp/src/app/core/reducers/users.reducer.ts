import * as UsersActions from './users.actions';
import { newState } from './app.reducer';
import { IUser } from '../models';

export function usersReducer(state: IUser[] = [], action: UsersActions.AllUserActions) {
    switch (action.type) {
        case UsersActions.SET_USERS:
            return newState(state, action.users);
        case UsersActions.ADD_USER:

            let addUserNewState = state.concat((<UsersActions.AddUser>action).user);
            addUserNewState = addUserNewState.sort((a, b) => {
                if (a.username > b.username) {
                    return 1;
                } else {
                    return -1;
                }
            });
            return newState(state, addUserNewState);
        case UsersActions.MODIFY_USER:
            const modifiedUserNewState = (<UsersActions.ModifyUser>action).user;
            const userToModify = state.filter(x => x.id === modifiedUserNewState.id)[0];
            const idxOfUpd = state.indexOf(userToModify);
            const updateUserNewState = [
                ...state.slice(0, idxOfUpd),
                modifiedUserNewState,
                ...state.slice(idxOfUpd + 1, state.length)
            ];
            return updateUserNewState;
        case UsersActions.DELETE_USER:
            const idx = (<UsersActions.DeleteUser>action).id;
            const userToDelete = state.filter(x => x.id === idx)[0];
            const idxOfDel = state.indexOf(userToDelete);
            const deleteUserNewState = [
                ...state.slice(0, idxOfDel),
                ...state.slice(idxOfDel + 1, state.length)
            ]
            return deleteUserNewState;
        default:
            return state;
    }
}