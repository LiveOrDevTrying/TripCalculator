import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth';
import { ServicesModule } from './services';
import { ReducersModule } from './reducers';

@NgModule({
  declarations: [],
  imports: [
    AuthModule,
    ServicesModule,
    ReducersModule
  ],
  exports: [
    CommonModule,
    AuthModule,
    ServicesModule,
    ReducersModule
  ]
})
export class CoreModule { }
