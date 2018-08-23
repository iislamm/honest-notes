import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';

const url = "http://localhost:3000/";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }


  update(ops): Observable<any> {
    let user = this.auth.getCurrentUser;
    let token = this.auth.getToken();
    let headers = new HttpHeaders;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', token);
    console.log("should send the request");
    return this.http.put(`${url}users/edit`, ops, {headers: headers}).pipe(
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
}
