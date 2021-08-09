import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';
import { usersReducer } from './users.reducer';
import { tripsReducer } from './trips.reducer';
import { tripsusersReducer } from './tripsusers.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("app", appReducer),
    StoreModule.forFeature("users", usersReducer),
    StoreModule.forFeature("trips", tripsReducer),
    StoreModule.forFeature("tripsUsers", tripsusersReducer),
  ]
})
export class ReducersModule { }
