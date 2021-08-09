import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { AppState, ITripUser } from 'src/app/core';
import { BaseComponent } from '../base/base.component';
import { ITripUserWidgetData } from '../models';

@Component({
  selector: 'app-tripuserwidget',
  templateUrl: './tripuserwidget.component.html',
  styleUrls: ['./tripuserwidget.component.scss']
})
export class TripuserwidgetComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() props: ITripUserWidgetData;
  @Input() propsChanged: Subject<any>;
  @Output() tripUserClicked = new EventEmitter<ITripUser>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'username',
    'txCount',
    'expensesForTripUser'
  ];

  dataSource = new MatTableDataSource<ITripUser>();

  $propsChangedSubscription: Subscription;

  constructor(protected store: Store<AppState>) {
    super(store);
   }

  ngOnInit() {
    this.$propsChangedSubscription = this.propsChanged
      .subscribe(x => {
        this.afterAssignTripsUsers();
      });
      
    this.afterAssignTripsUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$propsChangedSubscription.unsubscribe();
  }

  
  rowClickedEvent(tripUser: ITripUser) {
    this.tripUserClicked.next(tripUser);
  }

  afterAssignTripsUsers() {
    if (this.dataSource) {
      this.dataSource.data = this.props.tripsUsers;
    }
  }

  createTripUser() {
    alert('not yet implemented');
  }
}
