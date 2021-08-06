import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { usersReducer } from './users.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("app", appReducer),
    StoreModule.forFeature("users", usersReducer)
  ]
})
export class ReducersModule { }
