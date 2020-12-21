import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public loginState$: Subject<any> = new Subject<any>();
constructor(private http: HttpClient) { }
login(userName: string, password: string): Observable<any> {
  return this.http.post<any>('https://reqres.in/api/login', {'email': userName, 'password': password})
  .pipe(map(user => {
    // login successful
    if (user && user.token) {
        // store user details
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('name', userName);
    }

    return user;
}));
}
}
