import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState, ITrip, ITripUser } from 'src/app/core';
import { BaseComponent } from '../base/base.component';
import { ITripsWidgetData, ITripUserWidgetData } from '../models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {

  $tripsSubject = new Subject();

  constructor(protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
  }

  getTripUserWidgetData(trip: ITrip) {
    const props: ITripUserWidgetData = {
      trip: trip,
      canCreateTripUser: false,
      tripsUsers: this.getTripUsers(trip.id)
    }

    return props;
  }

  onTripUserClicked(tripUser: ITripUser) {

  }
}
