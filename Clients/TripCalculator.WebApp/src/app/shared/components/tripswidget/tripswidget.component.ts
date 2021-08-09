import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { AppState, ITrip } from 'src/app/core';
import { BaseComponent } from '../base/base.component';
import { ITripsWidgetData } from '../models';

@Component({
  selector: 'app-tripswidget',
  templateUrl: './tripswidget.component.html',
  styleUrls: ['./tripswidget.component.scss']
})
export class TripswidgetComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() props: ITripsWidgetData;
  @Input() propsChanged: Subject<any>;
  @Output() tripClicked = new EventEmitter<ITrip>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'tripName',
    'startDate',
    'endDate',
    'userCount'
  ];

  dataSource = new MatTableDataSource<ITrip>();

  $propsChangedSubscription: Subscription;

  constructor(protected store: Store<AppState>) {
    super(store);
   }

  ngOnInit() {
    this.$propsChangedSubscription = this.propsChanged
      .subscribe(x => {
        this.afterAssignTrips();
      });
      
    this.afterAssignTrips();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$propsChangedSubscription.unsubscribe();
  }

  
  rowClickedEvent(trip: ITrip) {
    this.tripClicked.next(trip);
  }

  afterAssignTrips() {
    if (this.dataSource) {
      this.dataSource.data = this.props.trips;
    }
  }

  createTrip() {
    alert('not yet implemented');
  }

  getUserCount(id: string) {
    return this.tripsUsers.filter(x => x.tripId === id).length;
  }
}
