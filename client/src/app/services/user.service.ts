import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, tap, catchError } from 'rxjs/operators';

import { apiUrl } from '../app.module';
const url = apiUrl();

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  update(ops): Observable<any> {
    let user = this.auth.getCurrentUser();
    let token = this.auth.getToken();
    let headers = new HttpHeaders({ 'Authorization': token });

    console.log("should send the request");
    return this.http.put(`${url}users/edit/${user._id}`, ops, {headers: headers}).pipe(
      map(res => res),
      tap(res => {
        let newUser = {
          token: token,
          user: res
        }

        this.auth.saveUser(newUser);
      })
    );
  }

  search(username): Observable<any> {
    return this.http.get(`${url}users/search/${username}`).pipe(
      map(results => results)
    )
  }
}
