import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { AppState, IExpense, ITrip, IUser } from 'src/app/core';
import { IExpenseWidgetData, IUsersWidgetData } from 'src/app/shared';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { ITripCreateRequest, ITripUpdateRequest, ITripVM } from '../models';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(MatDatepicker, { static: false }) startDatePicker: MatDatepicker<Date>;
  @ViewChild(MatDatepicker, { static: false }) endDatePicker: MatDatepicker<Date>;
  
  id: string;
  tripName: string;
  startDate: Date;
  endDate: Date;
  trip: ITrip;
  usersAvailable: IUsersWidgetData;
  usersAdded: IUsersWidgetData;
  loading = false;

  $routeSubscription: Subscription;
  $tripCreateSubscription: Subscription;
  $tripUpdateSubscription: Subscription;

  $usersSubject = new Subject();
  $expensesSubject = new Subject();
  
  constructor(protected store: Store<AppState>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected location: Location,
    protected toastrService: ToastrService,
    protected tripService: TripService) {
      super(store);

      this.$tripCreateSubscription = this.tripService
        .getCreateTrip()
        .subscribe((trip: ITripVM) => {
          if (trip) {
            this.toastrService.success('The trip was created successfully.');
            this.router.navigateByUrl('/trips/trips');
          } else {
            this.toastrService.error('The trip could not be created');
          }
        });

      this.$tripUpdateSubscription = this.tripService
        .getUpdateTrip()
        .subscribe((trip: ITripVM) => {
          if (trip) {
            this.toastrService.success('The trip was updated successfully.');
            this.router.navigateByUrl('/trips/trips');
          } else {
            this.toastrService.error('The trip could not be updated.');
          }
        });
   }

  ngOnInit() {
    this.$routeSubscription = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.assignTrip();
      });

    this.assignTrip();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$routeSubscription.unsubscribe();
    this.$tripCreateSubscription.unsubscribe();
    this.$tripUpdateSubscription.unsubscribe();
  }

  afterAssignTrips() {
    this.assignTrip();
  }

  afterAssignTripsUsers() {
    this.assignTrip();
  }

  afterAssignExpenses() {
    if (this.$expensesSubject) {
      this.$expensesSubject.next();
    }
  }

  assignTrip() {
    if (this.id) {
      if (this.trips && this.tripsUsers && !this.trip) {
        this.trip = this.trips.filter(x => x.id === this.id)[0];

        if (this.trip) {
          this.tripName = this.trip.tripName;
          this.startDate = this.trip.tripStartDate;
          this.endDate = this.trip.tripEndDate;

          this.usersAvailable = {
            title: 'Users Available To Add',
            canCreateUser: true,
            users: this.users.filter(x => !this.tripsUsers.find(t => t.userId === x.id && t.tripId === this.id))
          }

          this.usersAdded = {
            title: 'Users Added To Trip',
            canCreateUser: false,
            users: this.users.filter(x => this.tripsUsers.find(t => t.userId === x.id && t.tripId === this.id))
          }
        }
      }
    } else {
      if (this.users && !this.usersAvailable && !this.usersAdded) {
        this.usersAvailable = {
          title: 'Users Available To Add',
          canCreateUser: true,
          users: this.users
        }

        this.usersAdded = {
          title: 'Users Added To Trip',
          canCreateUser: false,
          users: []
        }
      }
    }

  }

  isTripValid(): boolean {
    if (!this.tripName ||
      this.tripName === null ||
      this.tripName === '') {
      this.toastrService.error("Trip Name cannot be blank - Please enter a Trip Name and try again");
      return false;
    }

    return true;
  }

  saveTrip() {
    if (this.isTripValid()) {
      if (!this.id ||
        this.id === null ||
        this.id === '') {
        // Create
        const createRequest: ITripCreateRequest = {
          tripName: this.tripName,
          tripStartDate: this.startDate,
          tripEndDate: this.endDate,
          userIds: this.usersAdded.users.map(x => x.id)
        };
        this.tripService.createTrip(createRequest);
      } else {
        // Update
        const request: ITripUpdateRequest = {
          id: this.id,
          tripName: this.tripName,
          tripStartDate: this.startDate,
          tripEndDate: this.endDate,
          userIds: this.usersAdded.users.map(x => x.id)
        };
        this.tripService.updateTrip(request);
      }
    }
  }

  back() {
    this.location.back();
  }

  onUserAvailableClicked(user: IUser) {
    this.usersAvailable.users = this.usersAvailable.users.filter(x => x.id !== user.id);
    this.usersAdded.users.push(user);

    this.$usersSubject.next();
  }

  onUserAddedClicked(user: IUser) {
    this.usersAdded.users = this.usersAdded.users.filter(x => x.id !== user.id);
    this.usersAvailable.users.push(user);

    this.$usersSubject.next();
  }

  onExpenseClick(expense: IExpense) {
  }

  getExpenseWidgetDate(tripUserId: string) {
    const props : IExpenseWidgetData = {
      tripUserId: tripUserId,
      canCreateExpense: true,
      expenses: this.getExpenses(tripUserId)
    }
    return props;
  }
}
