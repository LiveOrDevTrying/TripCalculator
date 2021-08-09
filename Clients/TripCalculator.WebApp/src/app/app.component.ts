import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
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
  
  $routerSubscription: Subscription;

  constructor(protected store: Store<AppState>,
    protected http: HttpService,
    protected router: Router) {
    super(store);
    
    this.$routerSubscription = this.router.events.subscribe(event => {
      // This is for Google Analytics
      if (event instanceof NavigationEnd) {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      }
    });
  }

  ngOnInit() {
    this.http.requestPayload();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.$routerSubscription.unsubscribe();
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return false;
  }

  isLoaded(): boolean {
    return false;
  }
}
