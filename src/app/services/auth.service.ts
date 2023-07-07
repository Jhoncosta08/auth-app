import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Endpoints } from "../endpoints";
import {AuthResponseData} from "../interfaces/authResponseData";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<UserModel | null>(null);

  constructor(private http: HttpClient) { }

  private errorHandling(error: HttpErrorResponse) {
    let errorMessage: string = 'An unknown error occurred!';
    switch (error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
      break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(() => errorMessage);
  }

  signIn(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(Endpoints.signInApi(), {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(err => {
        return this.errorHandling(err);
      }), tap(resData => {
      const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000);
      const user = new UserModel(resData.email, resData.localId, resData.idToken, expirationDate);
      this.user.next(user);
    }));
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(Endpoints.signUpApi(), {email: email, password: password, returnSecureToken: true}).pipe(catchError(err => {
      return this.errorHandling(err);
    }), tap(resData => {
      const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000 );
      const user = new UserModel(resData.email, resData.localId, resData.idToken, expirationDate);
      this.user.next(user);
    }));
  }

}
