import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AppState, ITrip, IUser } from 'src/app/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { IUserCreateRequest, IUserUpdateRequest } from '../models';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends BaseComponent implements OnInit, OnDestroy {
  id: string;
  username: string;
  user: IUser;
  loading = false;

  $routeSubscription: Subscription;
  $userCreateSubscription: Subscription;
  $userUpdateSubscription: Subscription;
  
  constructor(protected store: Store<AppState>,
    protected route: ActivatedRoute,
    protected router: Router,
    protected location: Location,
    protected toastrService: ToastrService,
    protected userService: UserService) {
      super(store);
      this.$userCreateSubscription = this.userService
        .getCreateUser()
        .subscribe((user: IUser) => {
          if (user) {
            this.toastrService.success('The user was created successfully.');
            this.router.navigateByUrl('/users/users');
          } else {
            this.toastrService.error('The user could not be created');
          }
        });

      this.$userUpdateSubscription = this.userService
        .getUpdateUser()
        .subscribe((user: IUser) => {
          if (user) {
            this.toastrService.success('The user was updated successfully.');
            this.router.navigateByUrl('/users/users');
          } else {
            this.toastrService.error('The user could not be updated.');
          }
        });
   }

  ngOnInit() {
    this.$routeSubscription = this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.assignUser();
      });

    this.assignUser();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$routeSubscription.unsubscribe();
    this.$userCreateSubscription.unsubscribe();
    this.$userUpdateSubscription.unsubscribe();
  }

  afterAssignUsers() {
    this.assignUser();
  }

  afterAssignTripsUsers() {
    this.assignUser();
  }

  assignUser() {
    if (this.id) {
      if (this.users && this.tripsUsers && !this.user) {
        this.user = this.users.filter(x => x.id === this.id)[0];

        if (this.user) {
          this.username = this.user.username;
        }
      }
    }
  }

  isUserValid(): boolean {
    if (!this.username ||
      this.username === null ||
      this.username === '') {
      this.toastrService.error("Username cannot be blank - Please enter a username and try again");
      return false;
    }

    return true;
  }

  saveUser() {
    if (this.isUserValid()) {
      if (!this.id ||
        this.id === null ||
        this.id === '') {
        // Create
        const createRequest: IUserCreateRequest = {
          username: this.username
        };
        this.userService.createUser(createRequest);
      } else {
        // Update
        const request: IUserUpdateRequest = {
          id: this.id,
          username: this.username
        };
        this.userService.updateUser(request);
      }
    }
  }

  back() {
    this.location.back();
  }
}
