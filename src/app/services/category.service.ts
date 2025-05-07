import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';
import { Category } from '../interfaces/category';
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

  getCategories() : Observable<Response<Category[]>> {
    return this.http.get<Response<Category[]>>( 'http://localhost:3000/api/categories' );
  }

  createCategory( newCategory: Category ) : Observable<Response<Category>> {
    return this.http.post<Response<Category>>( 'http://localhost:3000/api/categories', newCategory, { headers: this.headers } );
  }

  deleteCategoryById( id: string ) : Observable<Response<Category>> {
    return this.http.delete<Response<Category>>( `http://localhost:3000/api/categories/${ id }`, { headers: this.headers } );
  }

  getCategoryById( id: string ) : Observable<Response<Category>> {
    return this.http.get<Response<Category>>( `http://localhost:3000/api/categories/${ id }` );
  }

  updateCategoryById( id: string, updatedCategory: any ) {
    return this.http.patch( `http://localhost:3000/api/categories/${ id }`, updatedCategory, { headers: this.headers } )
  }
}
