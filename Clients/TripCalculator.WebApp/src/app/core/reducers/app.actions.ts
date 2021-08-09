import { Action } from '@ngrx/store';

export const SET_CLAIMS = '[App] Set Claims';

export class SetClaims implements Action {
    readonly type = SET_CLAIMS;
    
    constructor(public claims: any) {
    }
}

export type AllAppActions
    = SetClaims;