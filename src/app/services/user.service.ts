import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IUser } from '../models/user';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient ) { }

  getUsers() {

    return this.http.get<IUser[]>(`${base_url}/users`).pipe(
      map( resp => resp ),
    );
  }

  createUser(user: IUser) {
    return this.http.post<IUser>(`${ base_url }/users`, user);
  }

  updateUser(user: IUser, id: number){
    return this.http.put<IUser>(`${base_url}/users/${id}`, user);
  }

  delete(id:number) {
    return this.http.delete(`${base_url}/users/${id}`);
  }

}
