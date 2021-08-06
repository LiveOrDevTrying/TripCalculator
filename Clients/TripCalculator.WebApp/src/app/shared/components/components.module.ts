import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CoreModule } from 'src/app/core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { NgxLoadingModule } from 'ngx-loading';
import { HomeComponent } from './home/home.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    HomeComponent,
    BaseComponent
  ],
  imports: [
    FormsModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RouterModule.forChild([]),
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    NgxLoadingModule,
    ToastrModule,
    RouterModule
  ]
})
export class ComponentsModule { }
