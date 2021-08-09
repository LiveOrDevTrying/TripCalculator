import * as AppActions from './app.actions';

export function newState(state: any, newData: any) {
    return Object.assign([], state, newData);
}

export function appReducer(state: any = [], action: AppActions.AllAppActions) {
    switch (action.type) {
        case AppActions.SET_CLAIMS:
            return newState(state, action.claims);
        default:
            return state;
    }
}