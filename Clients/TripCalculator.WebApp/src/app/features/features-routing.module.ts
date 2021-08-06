import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from '../core';

const routes: Routes = [];

// const routes: Routes = [ 
//   { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule), canActivate: [AuthguardService], runGuardsAndResolvers: 'always' },
//   { path: 'alerts', loadChildren: () => import('./alerts/alerts.module').then(m => m.AlertsModule), canActivate: [AuthguardService] },
//   { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule), canActivate: [AuthguardService] },
//   { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule), canActivate: [AuthguardService] },
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
