import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, OldUser, newUser } from '../user';

import { apiUrl } from '../app.module';
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
    return `./data/uploads/profile-pictures/${user._id}.jpg`;
  }

  customAvatarUrl(id): string {
    return `./data/uploads/profile-pictures/${id}.jpg`;
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
      map(res => res)
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
    console.log('service submit');
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${url}auth/login/email`, user, {headers: headers}).pipe(
      map(res => res)
    )
  }

  setAvatar(fd: FormData, id: string): Observable<any> {
    return this.http.put(`${url}users/${id}/avatar`, fd).pipe(
      map(res => res),
      tap(res => {
          console.log(res);
      })
    )
  }

  register(newUser: newUser, fd: FormData): Observable<any> {
    console.log(newUser);

    return this.http.post<Object>(`${url}users/register`, newUser ).pipe(
      map(res => res),
      tap(res => {
        this.setAvatar(fd, res.id).subscribe();
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


