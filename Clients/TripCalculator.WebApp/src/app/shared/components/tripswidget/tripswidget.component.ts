import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { AppState, ITrip } from 'src/app/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-tripswidget',
  templateUrl: './tripswidget.component.html',
  styleUrls: ['./tripswidget.component.scss']
})
export class TripswidgetComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() userId: string;
  @Input() canCreateTrip = false;
  @Input() title: string;
  @Output() tripClicked = new EventEmitter<ITrip>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'tripName',
    'startDate',
    'endDate',
    'userCount'
  ];

  selectedTrips: ITrip[] = [];
  dataSource = new MatTableDataSource<ITrip>();

  constructor(protected store: Store<AppState>) {
    super(store);
   }

  ngOnInit() {
    this.afterAssignTrips();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  rowClickedEvent(trip: ITrip) {
    this.tripClicked.next(trip);
  }

  afterAssignTrips() {
    if (this.dataSource && this.trips) {
      this.selectedTrips = this.trips.filter(x => this.tripsUsers.find(t => t.tripId === x.id && t.userId === this.userId))
      this.dataSource.data = this.selectedTrips;
    }
  }

  createTrip() {
    alert('not yet implemented');
  }
}
