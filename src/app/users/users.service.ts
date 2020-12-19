import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IresponseModel  } from './user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private http: HttpClient) { }
getAllUsers(pagenumber): Observable<IresponseModel> {
 return this.http.get <IresponseModel>('https://reqres.in/api/users',
 { params: {page: pagenumber }
});
}
addUser(userName: string, userJob: string):  Observable<any> {
  return this.http.post<any>('https://reqres.in/api/users', {name: userName,
  job: userJob});
}
editUser(id: number, userName: string, userJob: string): Observable<any> {
  return this.http.post<any>('https://reqres.in/api/users/' + id, {name: userName,
  job: userJob});
}
deleteUser(id: number): Observable<any> {
  return this.http.delete<any>('https://reqres.in/api/users/' + id);
}
getUser(id: number): Observable<any> {
  return this.http.get<any>('https://reqres.in/api/users/' + id);
}
}
