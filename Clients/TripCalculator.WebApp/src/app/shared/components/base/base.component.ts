import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, ITrip, ITripUser, IUser } from 'src/app/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
  users: IUser[] = [];
  trips: ITrip[] = [];
  tripsUsers: ITripUser[] = [];

  $usersSubscription: Subscription;
  $tripsSubscription: Subscription;
  $tripsUsersSubscription: Subscription;

  constructor(protected store: Store<AppState>) { 
    this.$usersSubscription = this.store
      .select(x => x.users)
      .subscribe((users: IUser[]) => {
        this.users = users;
        this.afterAssignUsers();
      }
    );

    this.$tripsSubscription = this.store
      .select(x => x.trips)
      .subscribe((trips: ITrip[]) => {
        this.trips = trips;
        this.afterAssignTrips();
      }
    );

    this.$tripsUsersSubscription = this.store
      .select(x => x.tripsUsers)
      .subscribe((tripsUsers: ITripUser[]) => {
        this.tripsUsers = tripsUsers;
        this.afterAssignTripsUsers();
      }
    );
  }

  ngOnDestroy() {
    this.$usersSubscription.unsubscribe();
    this.$tripsSubscription.unsubscribe();
    this.$tripsUsersSubscription.unsubscribe();
  }

  afterAssignUsers() {
  }

  afterAssignTrips() {
  }

  afterAssignTripsUsers() {
  }
}
