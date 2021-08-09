import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, IUser } from 'src/app/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnDestroy {
  users: IUser[] = [];

  $usersSubscription: Subscription;

  constructor(protected store: Store<AppState>) { 
    this.$usersSubscription = this.store
      .select(x => x.users)
      .subscribe((users: IUser[]) => {
        this.users = users;
        this.afterAssignUsers();
      }
    );
  }

  ngOnDestroy() {
    this.$usersSubscription.unsubscribe();
  }

  afterAssignUsers() {
  }
}
