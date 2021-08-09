import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { AddTrip, AppState, DeleteTrip, GlobalsService, ITrip, ModifyTrip, SetTripsUsers } from 'src/app/core';
import { ITripCreateRequest, ITripUpdateRequest, ITripVM } from './models';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  $tripCreateSubject = new Subject<ITripVM>();
  $tripUpdateSubject = new Subject<ITripVM>();
  $tripDeleteSubject = new Subject<boolean>();

  constructor(protected httpClient: HttpClient,
    protected globalsService: GlobalsService,
    protected store: Store<AppState>) { 
    }

  createTrip(request: ITripCreateRequest) {
    this.httpClient.post<ITripVM>(`${this.globalsService.webapiUri}/trips`, request)
      .subscribe((tripVM: ITripVM) => {
        console.log(tripVM.dto);

        if (tripVM) {
          this.store.dispatch(new AddTrip(tripVM.dto));
          this.store.dispatch(new SetTripsUsers(tripVM.tripsUsers));
        }

        this.$tripCreateSubject.next(tripVM);
      });
  }

  updateTrip(request: ITripUpdateRequest) {
    this.httpClient.put<ITripVM>(`${this.globalsService.webapiUri}/trips/${request.id}`, request)
      .subscribe((tripVM: ITripVM) => {
        if (tripVM) {
          this.store.dispatch(new ModifyTrip(tripVM.dto));
          this.store.dispatch(new SetTripsUsers(tripVM.tripsUsers));
        }

        this.$tripUpdateSubject.next(tripVM);
      });
  }

  deleteTrip(id: string) {
    this.httpClient.delete<HttpResponse<any>>(`${this.globalsService.webapiUri}/trips/${id}`, {observe : 'response'})
      .subscribe((response: HttpResponse<any>) => {
        if (response.ok) {
          this.store.dispatch(new DeleteTrip(id));
        }

        this.$tripDeleteSubject.next(response.ok)
      })
  }

  getCreateTrip(): Observable<ITripVM> {
    return this.$tripCreateSubject.asObservable();
  }

  getUpdateTrip(): Observable<ITripVM> {
    return this.$tripUpdateSubject.asObservable();
  }

  getDeleteTrip(): Observable<boolean> {
    return this.$tripDeleteSubject.asObservable();
  }
}

