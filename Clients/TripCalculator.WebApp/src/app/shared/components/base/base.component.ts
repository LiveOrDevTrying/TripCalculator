import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, IExpense, ITrip, ITripUser, ITripUserReimburse, IUser } from 'src/app/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
  users: IUser[] = [];
  trips: ITrip[] = [];
  tripsUsers: ITripUser[] = [];
  expenses: IExpense[] = [];
  tripsUsersReimburse: ITripUserReimburse[] = [];

  $usersSubscription: Subscription;
  $tripsSubscription: Subscription;
  $tripsUsersSubscription: Subscription;
  $expensesSubscription: Subscription;
  $tripsUsersReimburseSubscription: Subscription;

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

    this.$expensesSubscription = this.store
      .select(x => x.expenses)
      .subscribe((expenses: IExpense[]) => {
        this.expenses = expenses;
        this.afterAssignExpenses();
      }
    );

    this.$tripsUsersReimburseSubscription = this.store
      .select(x => x.tripUsersReimburse)
      .subscribe((tripsUsersReimburse: ITripUserReimburse[]) => {
        this.tripsUsersReimburse = tripsUsersReimburse;
        this.afterAssignTripsUsersReimburse();
      });
  }

  ngOnDestroy() {
    this.$usersSubscription.unsubscribe();
    this.$tripsSubscription.unsubscribe();
    this.$tripsUsersSubscription.unsubscribe();
    this.$expensesSubscription.unsubscribe();
    this.$tripsUsersReimburseSubscription.unsubscribe();
  }

  afterAssignUsers() {
  }

  afterAssignTrips() {
  }

  afterAssignTripsUsers() {
  }

  afterAssignExpenses() {
  }

  afterAssignTripsUsersReimburse() {
  }
  
  getUserCount(tripId: string): number {
    return this.tripsUsers.filter(x => x.tripId === tripId).length;
  }

  getUsername(userId: string): string {
    const user = this.users.find(x => x.id === userId);
    if (user) {
      return user.username;
    }
    return '';
  }

  getUsernameFromTripUserId(tripUserId: string) {
    const tripUser = this.tripsUsers.find(x => x.id === tripUserId);

    if (tripUser) {
      return this.getUsername(tripUser.userId);
    }
    return '';
  }

  getTripUsers(tripId: string) {
    return this.tripsUsers.filter(x => x.tripId === tripId);
  }
  
  getTxCount(tripUserId: string): number {
    return this.expenses.filter(x => x.tripUserId === tripUserId).length;
  }

  getExpenses(tripUserId: string): IExpense[] {
    return this.expenses.filter(x => x.tripUserId === tripUserId)
  }

  getExpensesTotalForTripUser(tripUserId: string): number {
    let total = 0;

    this.expenses.filter(x => x.tripUserId === tripUserId)
      .map(x => x.amount)
      .forEach(x => {
        total += x;
      });

      return total;
  }

  getExpensesTotalForTrip(tripId: string): number {
    let total = 0;

    this.tripsUsers
      .filter(x => x.tripId === tripId)
      .map(x => this.getExpensesTotalForTripUser(x.id))
      .forEach(x => {
        total += x;
      });

      return total;
  }
}
