import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(
    private oauthService: OAuthService,
    private router: Router,
    private http: HttpService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      // Check to see if we have an application user
      // If we dont, we navigate to [/]
      if (this.oauthService.hasValidAccessToken() &&
        this.http.isPayloadReceived) {
        return true;
      }

      this.router.navigate(['/']);
      return false;
    };
}
