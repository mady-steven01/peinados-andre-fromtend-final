import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';
import { Styles } from '../interfaces/styles';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private token: string;
  private headers: HttpHeaders;

  constructor( private http: HttpClient ) {
    this.token = localStorage.getItem( 'token' ) ?? '';
    console.log( this.token );
    this.headers = new HttpHeaders().set( 'X-Token', this.token! );
  }

  getCategories() : Observable<Response<Styles[]>> {
    return this.http.get<Response<Styles[]>>( 'http://localhost:3000/api/categories' );
  }

  createCategory( newCategory: Styles ) : Observable<Response<Styles>> {
    return this.http.post<Response<Styles>>( 'http://localhost:3000/api/categories', newCategory, { headers: this.headers } );
  }

  deleteCategoryById( id: string ) : Observable<Response<Styles>> {
    return this.http.delete<Response<Styles>>( `http://localhost:3000/api/categories/${ id }`, { headers: this.headers } );
  }

  getCategoryById( id: string ) : Observable<Response<Styles>> {
    return this.http.get<Response<Styles>>( `http://localhost:3000/api/categories/${ id }` );
  }

  updateCategoryById( id: string, updatedCategory: any ) {
    return this.http.patch( `http://localhost:3000/api/categories/${ id }`, updatedCategory, { headers: this.headers } )
  }
}
