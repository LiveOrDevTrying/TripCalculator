import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';
import { SharedModule } from 'src/app/shared';


@NgModule({
  declarations: [
    TripsComponent,
    TripComponent
  ],
  imports: [
    TripsRoutingModule,
    SharedModule
  ],
  exports: [
    SharedModule
  ]
})
export class TripsModule { }
