import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState, ITrip, ITripUser } from 'src/app/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent {
  constructor(protected store: Store<AppState>) {
    super(store);
  }

  onTripUserClicked(tripUser: ITripUser) {
  }
}
