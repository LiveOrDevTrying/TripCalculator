import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared';
import { ReducersModule } from '../core';
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    FeaturesRoutingModule,
    SharedModule,
    ReducersModule
  ],
  exports: [
    FeaturesRoutingModule,
    SharedModule
  ]
})
export class FeaturesModule { }
