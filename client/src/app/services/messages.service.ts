import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthService } from './auth.service';
import { pipe } from '@angular/core/src/render3/pipe';

const url = "http://honest-notes.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  unreadNumber(): Observable<any> {
    let token = this.auth.getToken();
    let headers = new HttpHeaders({ 'Authorization': token });
    console.log(headers);
    return this.http.get(`${url}messages/all/unread`, {headers: headers}).pipe(
      map(res => res)
    );
  }

  getRecieved(): Observable<any> {
    let token = this.auth.getToken();
    let headers = new HttpHeaders({ 'Authorization': token });

    return this.http.get(`${url}messages/all/recieved`, {headers: headers}).pipe(
      map(res => res)
    )

  }

  getSent(): Observable<any> {
    let token = this.auth.getToken();
    let headers = new HttpHeaders({ 'Authorization': token });

    return this.http.get(`${url}messages/all/sent`, {headers: headers}).pipe(
      map(res => res)
    )

  }

  setSeen(): Observable<any> {
    let token = this.auth.getToken();
    let headers = new HttpHeaders({ 'Authorization': token });

    return this.http.put(`${url}messages/seen`, {}, {headers: headers}).pipe(
      map(res => res)
    );
  }

  newMessage(message: string, reciever: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = this.auth.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    let body = {
      "sender": user._id,
      "reciever": reciever,
      "content": message
    }

    return this.http.post(`${url}messages/new`, body, httpOptions).pipe(
      map(res => res),
      tap(res => {console.log(res);})
    )
  }

  newFeedback(message: string): Observable<any> {
    let user = JSON.parse(localStorage.getItem('user'));
    let token = this.auth.getToken();

    console.log('token:', token);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    let body = {
      sender:  user._id,
      content: message
    }

    return this.http.post(`${url}reports/new`, body, httpOptions).pipe(
      map(res => res)
    )

  }

}
