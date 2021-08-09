import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from 'src/app/core';
import { TripComponent } from './trip/trip.component';
import { TripsComponent } from './trips/trips.component';

const routes: Routes = [
  { path: 'trips', component: TripsComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
  { path: 'trip/:id', component: TripComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
  { path: 'trip', component: TripComponent, canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripsRoutingModule { }
