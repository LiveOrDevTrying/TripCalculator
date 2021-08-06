import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState, IUser } from 'src/app/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {
  users: IUser[] = [];

  $usersSubscription: Subscription;

  constructor(protected store: Store<AppState>) { 
    this.$usersSubscription = this.store
      .select(x => x.users)
      .subscribe((users: IUser[]) => {
        this.users = users;
        console.log(this.users);
        alert('done!');
      }
    );
  }

  ngOnInit(): void {
  }

}
