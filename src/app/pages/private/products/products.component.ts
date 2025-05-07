import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [ RouterLink ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];
  isLoading: boolean = true;

  constructor( private productService: ProductService ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: ( data ) => {
        console.log( data );
        console.log( 'Successfully obtains products' );

        this.products = data.data ?? [];    // Asignara una lista vacia para evitar asignar undefined
      },
      error: ( error ) => {
        console.error( error );
        this.isLoading = false;               // Asegura que el estado de carga se actualice en caso de error
      },
      complete: () => {
        this.isLoading = false;               // También lo actualiza cuando la petición es exitosa
      }
    });
  }

  onRemove( productId : string ) {

    if( ! productId ) {
      console.error( 'Invalid product ID' );
      return;
    }

    this.productService.deleteProductById( productId ).subscribe({
      next: ( data ) => {
        console.log( data );
        console.log( 'Delete product successfully' );

        this.ngOnInit();    // Actualiza datos
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {},
    });
  }
}
