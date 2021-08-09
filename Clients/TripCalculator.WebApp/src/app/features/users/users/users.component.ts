import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState, IUser } from 'src/app/core';
import { ConfirmationmodalComponent, IConfirmationModalData } from 'src/app/shared';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  $userDeleteSubscription: Subscription;

  displayedColumns: string[] = [
    'username',
    'trips',
    'remove'
  ];

  loading = false;
  dataSource = new MatTableDataSource<IUser>();

  constructor(protected store: Store<AppState>,
    protected toastrService: ToastrService,
    protected router: Router,
    protected matDialog: MatDialog,
    protected userService: UserService) {
    super(store); 

    this.$userDeleteSubscription = this.userService
      .getDeleteUser()
      .subscribe(success => {
        this.loading = false;

        if (success) {
          this.toastrService.success('The user was deleted successfully.');
        } else {
          this.toastrService.error('The user could not be deleted.');
        }
      });
  }

  ngOnInit() {
    this.afterAssignUsers();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$userDeleteSubscription.unsubscribe();
  }

  afterAssignUsers() {
    if (this.dataSource) {
      this.dataSource.data = this.users;
    }
  }

  createUser() {
    this.router.navigateByUrl('/users/user');
  }

  removeUser(id: string) {
    const confirmationModalData: IConfirmationModalData = {
      title: 'Are you sure?',
      message: 'Are you sure you want to delete this user?',
      isConfirmed: false,
      confirmMessage: 'Confirm',
      cancelMessage: 'Cancel'
    };

    const confirmation = this.matDialog.open(ConfirmationmodalComponent, {
      width: '250px',
      data: confirmationModalData
    });

    confirmation.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.loading = true;

        this.userService.deleteUser(id);
      }
    });
  }

  getTripCount(id: string) {
    return this.tripsUsers.filter(x => x.userId === id).length;
  }
}
