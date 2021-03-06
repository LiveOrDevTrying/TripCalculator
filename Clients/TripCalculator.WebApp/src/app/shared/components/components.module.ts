import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmationmodalComponent } from './modals/confirmationmodal/confirmationmodal.component';
import { ModulesModule } from '../modules/modules.module';
import { UserswidgetComponent } from './userswidget/userswidget.component';
import { TripswidgetComponent } from './tripswidget/tripswidget.component';
import { TripuserwidgetComponent } from './tripuserwidget/tripuserwidget.component';
import { ExpenseswidgetComponent } from './expenseswidget/expenseswidget.component';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    ConfirmationmodalComponent,
    UserswidgetComponent,
    TripswidgetComponent,
    TripuserwidgetComponent,
    ExpenseswidgetComponent
  ],
  imports: [
    FormsModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RouterModule.forChild([]),
    ModulesModule,
    NgxCurrencyModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    NgxLoadingModule,
    ToastrModule,
    RouterModule,
    UserswidgetComponent,
    TripswidgetComponent,
    ExpenseswidgetComponent
  ],
  entryComponents: [
    ConfirmationmodalComponent
  ]
})
export class ComponentsModule { }
