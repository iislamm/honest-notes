import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, OldUser, newUser } from '../user';

import { apiUrl } from '../app.module';
import * as firebase from 'firebase/app';
import 'firebase/storage';
const url = apiUrl();

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  authToken: any;
	user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  avatarUrl(): string {
    let user = JSON.parse(localStorage.getItem('user'));
    return `https://firebasestorage.googleapis.com/v0/b/honest-notes.appspot.com/o/${user._id}.jpg?alt=media&token=2095d0b1-5ba1-42ab-8229-93ac86a3eb1b`;
  }

  customAvatarUrl(id): string {
    return `https://firebasestorage.googleapis.com/v0/b/honest-notes.appspot.com/o/${id}.jpg?alt=media&token=2095d0b1-5ba1-42ab-8229-93ac86a3eb1b`;
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${url}users/find/${id}`).pipe(
      map(res => res)
    );
  }

  getUsername(username: string): Observable<any> {
    return this.http.get(`${url}users/get/username/${username}`).pipe(
      map(res => res)
    );
  }

  findUsername(username: string): Observable<any> {
    return this.http.get(`${url}users/find/username/${username}`).pipe(
      map(res => res)
    );
  }

  getLoginHistory(): Observable<any> {
    let token = this.getToken();
    let headers = new HttpHeaders({'Authorization': token});
    return this.http.get(`${url}users/loginhistory`, {headers: headers}).pipe(
      map(res => res),
      tap(res => {
        localStorage.setItem('loginHistory', res);
      })
    );
  }

  saveUser(res): void {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.authToken = res.token;
		this.user = res.user;
  }

  loadToken(): void {
		const token = localStorage.getItem('token');
		this.authToken = token;
  }

  getToken(): string {
    this.loadToken();
    return this.authToken;
  }

  isLoggedIn(): boolean {
		return !(this.jwtHelper.isTokenExpired());
  }
  
  logOut(): void {
    localStorage.clear();
    this.authToken = '';
    this.user = '';
  }
  
  authenticateUser(): Observable<Object> {
    let headers = new HttpHeaders;
    this.loadToken();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.authToken);

    return this.http.get(`${url}auth/user`, {headers: headers}).pipe(
      map(res => res )
    );
  }

  logIn(user: OldUser): Observable<any> {
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${url}auth/login/email`, user, {headers: headers}).pipe(
      map(res => res)
    )
  }

  setAvatar(fd: FormData, id: string): void {
    const storageRef = firebase.storage().ref();
    const avatarRef = storageRef.child(id + ".jpg");
    console.log(fd);
    avatarRef.put(fd.get('avatar')).then(snapshot => {
      console.log(snapshot);
    }).catch(error => console.log(error));

  }

  register(newUser: newUser, fd: FormData): Observable<any> {
    console.log(newUser);

    return this.http.post<Object>(`${url}users/register`, newUser ).pipe(
      map(res => res),
      tap(res => {
        this.setAvatar(fd, res.id);
      })
    )
  }

  getCurrentUser(): User {
    if (this.isLoggedIn() == true) {
      let user = JSON.parse(localStorage.getItem('user'));
      return user;
    }
  }

}


