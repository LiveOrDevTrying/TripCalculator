import { NgModule } from '@angular/core';
import { ModulesModule } from './modules';
import { DirectivesModule } from './directives';
import { InterceptorsModule } from './interceptors';
import { PipesModule } from './pipes';
import { ComponentsModule } from './components';
import { CoreModule } from '../core';

@NgModule({
  declarations: [],
  imports: [
    ComponentsModule,
    DirectivesModule,
    InterceptorsModule,
    ModulesModule,
    PipesModule,
  ],
  exports: [
    CoreModule,
    ComponentsModule,
    DirectivesModule,
    InterceptorsModule,
    ModulesModule,
    PipesModule
  ]
})
export class SharedModule { }
