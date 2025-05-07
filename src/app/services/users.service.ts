import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    constructor( private http: HttpClient ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem( 'token' ) ?? '';

    return new HttpHeaders().set( 'X-Token', token );
  }

  registerUser( newUser: User ) : Observable<Response<User>> {
    return this.http.post<Response<User>>( 'http://localhost:3000/api/users', newUser, { headers: this.getHeaders() } );
  }

  getUsers() : Observable<Response<User[]>> {
    return this.http.get<Response<User[]>>( 'http://localhost:3000/api/users', { headers: this.getHeaders() } );
  }

  deleteUserById( id: string ) : Observable<Response<User>> {
    return this.http.delete<Response<User>>( `http://localhost:3000/api/users/${ id }`, { headers: this.getHeaders() } );
  }

  getUserById( id: string ) : Observable<Response<User>> {
    return this.http.get<Response<User>>( `http://localhost:3000/api/users/${ id }`, { headers: this.getHeaders() } );
  }

  updateUserById( id: string, updatedUser: any ) {
    return this.http.patch( `http://localhost:3000/api/users/${ id }`, updatedUser, { headers: this.getHeaders() } )
  }
}


