import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, HttpService } from './core';
import { BaseComponent } from './shared/components/base/base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit {
  loading = false;

  title = 'TripCalculator';
  
  constructor(protected store: Store<AppState>,
    protected http: HttpService) {
    super(store);
  }

  ngOnInit() {
    this.http.requestPayload();
  }

  isAuthenticated(): boolean {
    return false;
  }

  isLoaded(): boolean {
    return false;
  }
}
