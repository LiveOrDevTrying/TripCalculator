import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, IPayload } from '../models';
import { SetTrips, SetTripsUsers, SetUsers } from '../reducers';
import { GlobalsService } from './globals.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  isPayloadReceived = false;

  constructor(private httpClient: HttpClient,
    private globalsService: GlobalsService,
    private store: Store<AppState>) { }

  requestPayload() {
    this.httpClient.get<IPayload>(`${this.globalsService.webapiUri}/Payload`)
      .subscribe((payload: IPayload) => {
        this.store.dispatch(new SetUsers(payload.users));
        this.store.dispatch(new SetTrips(payload.trips));
        this.store.dispatch(new SetTripsUsers(payload.tripsUsers));
        this.isPayloadReceived = true;
      });
  }
}
