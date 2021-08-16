import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState, ITrip, ITripUser, ITripUserReimburse } from 'src/app/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-tripuserwidget',
  templateUrl: './tripuserwidget.component.html',
  styleUrls: ['./tripuserwidget.component.scss']
})
export class TripuserwidgetComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() trip: ITrip;
  @Input() canCreateTripUser = false;
  @Output() tripUserClicked = new EventEmitter<ITripUser>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectedTripUsers: ITripUser[] = [];
  selectedTripUsersReimburse: ITripUserReimburse[] = [];

  displayedColumns: string[] = [
    'username',
    'txCount',
    'expensesForTripUser'
  ];

  dataSource = new MatTableDataSource<ITripUser>();

  constructor(protected store: Store<AppState>) {
    super(store);
   }

  ngOnInit() {
    this.afterAssignTripsUsers();
    this.afterAssignTripsUsersReimburse();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  rowClickedEvent(tripUser: ITripUser) {
    this.tripUserClicked.next(tripUser);
  }

  afterAssignTripsUsers() {
    if (this.dataSource) {
      this.selectedTripUsers = this.tripsUsers.filter(x => x.tripId === this.trip.id);
      this.dataSource.data = this.selectedTripUsers;
    }
  }

  afterAssignTripsUsersReimburse() {
    if (this.selectedTripUsers) {
      this.selectedTripUsersReimburse = this.tripsUsersReimburse.filter(x => this.selectedTripUsers.find(t => x.tripUserId === t.id));
    }
  }

  createTripUser() {
    alert('not yet implemented');
  }
}
