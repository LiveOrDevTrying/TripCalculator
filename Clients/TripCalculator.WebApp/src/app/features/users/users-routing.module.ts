import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from 'src/app/core';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
  { path: 'user', component: UserComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
