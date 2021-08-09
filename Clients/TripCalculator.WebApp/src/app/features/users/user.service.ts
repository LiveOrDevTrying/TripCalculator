import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { AddUser, AppState, DeleteUser, GlobalsService, IUser, ModifyUser } from 'src/app/core';
import { IUserCreateRequest, IUserUpdateRequest } from './models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  $userCreateSubject = new Subject<IUser>();
  $userUpdateSubject = new Subject<IUser>();
  $userDeleteSubject = new Subject<boolean>();

  constructor(protected httpClient: HttpClient,
    protected globalsService: GlobalsService,
    protected store: Store<AppState>) { 
    }

  createUser(request: IUserCreateRequest) {
    this.httpClient.post<IUser>(`${this.globalsService.webapiUri}/users`, request)
      .subscribe((user: IUser) => {
        if (user) {
          this.store.dispatch(new AddUser(user));
        }

        this.$userCreateSubject.next(user);
      });
  }

  updateUser(request: IUserUpdateRequest) {
    this.httpClient.put<IUser>(`${this.globalsService.webapiUri}/users/${request.id}`, request)
      .subscribe((user: IUser) => {
        if (user) {
          this.store.dispatch(new ModifyUser(user));
        }

        this.$userUpdateSubject.next(user);
      });
  }

  deleteUser(id: string) {
    this.httpClient.delete<HttpResponse<any>>(`${this.globalsService.webapiUri}/users/${id}`, {observe : 'response'})
      .subscribe((response: HttpResponse<any>) => {
        if (response.ok) {
          this.store.dispatch(new DeleteUser(id));
        }

        this.$userDeleteSubject.next(response.ok)
      })
  }

  getCreateUser(): Observable<IUser> {
    return this.$userCreateSubject.asObservable();
  }

  getUpdateUser(): Observable<IUser> {
    return this.$userUpdateSubject.asObservable();
  }

  getDeleteUser(): Observable<boolean> {
    return this.$userDeleteSubject.asObservable();
  }
}
