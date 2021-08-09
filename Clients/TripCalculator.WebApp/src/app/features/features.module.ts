import { NgModule } from '@angular/core';
import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from 'src/app/shared';
import { ReducersModule } from 'src/app/core';

@NgModule({
  declarations: [
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
