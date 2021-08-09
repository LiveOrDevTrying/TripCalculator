import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent
  ],
  imports: [
    UsersRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class UsersModule { }
