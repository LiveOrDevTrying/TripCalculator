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

@NgModule({
  declarations: [
    BaseComponent,
    DashboardComponent,
    ConfirmationmodalComponent
  ],
  imports: [
    FormsModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RouterModule.forChild([]),
    ModulesModule
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    NgxLoadingModule,
    ToastrModule,
    RouterModule
  ],
  entryComponents: [
    ConfirmationmodalComponent
  ]
})
export class ComponentsModule { }
