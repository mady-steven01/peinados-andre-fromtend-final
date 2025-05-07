import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../interfaces/response';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /** Atributos */
  private token: string;
  private headers: HttpHeaders;

  constructor( private http: HttpClient ) {
    this.token = localStorage.getItem( 'token' ) ?? '';
    console.log( this.token );
    this.headers = new HttpHeaders().set( 'X-Token', this.token! );
  }

  getProducts() : Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>( 'http://localhost:3000/api/products' );
  }

  createProduct( newProduct: Product ) : Observable<Response<Product>> {
    return this.http.post<Response<Product>>( 'http://localhost:3000/api/products', newProduct, { headers: this.headers } );
  }

  deleteProductById( id: string ) : Observable<Response<Product>> {
    return this.http.delete<Response<Product>>( `http://localhost:3000/api/products/${ id }`, { headers: this.headers } );
  }

  getProductById( id: string ) : Observable<Response<Product>> {
    return this.http.get<Response<Product>>( `http://localhost:3000/api/products/${ id }` );
  }

  updateProductById( id: string, updatedProduct: any ) {
    return this.http.patch( `http://localhost:3000/api/products/${ id }`, updatedProduct, { headers: this.headers } )
  }
}
