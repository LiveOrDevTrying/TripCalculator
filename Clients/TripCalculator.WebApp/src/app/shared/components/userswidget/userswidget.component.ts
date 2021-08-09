import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { AppState, IUser } from 'src/app/core';
import { BaseComponent } from '../base/base.component';
import { IUsersWidgetData } from '../models';

@Component({
  selector: 'app-userswidget',
  templateUrl: './userswidget.component.html',
  styleUrls: ['./userswidget.component.scss']
})
export class UserswidgetComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() props: IUsersWidgetData;
  @Input() propsChanged: Subject<any>;
  @Output() userClicked = new EventEmitter<IUser>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'username'
  ];

  dataSource = new MatTableDataSource<IUser>();

  $propsChangedSubscription: Subscription;

  constructor(protected store: Store<AppState>) {
    super(store);
   }

  ngOnInit() {
    this.$propsChangedSubscription = this.propsChanged
      .subscribe(x => {
        this.afterAssignUsers();
      });
      
    this.afterAssignUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$propsChangedSubscription.unsubscribe();
  }

  rowClickedEvent(user: IUser) {
    this.userClicked.next(user);
  }

  afterAssignUsers() {
    if (this.dataSource) {
      this.dataSource.data = this.props.users;
    }
  }

  createUser() {
    alert('not yet implemented');
  }
}
