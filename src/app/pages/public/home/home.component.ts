import { Component } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from '../../../services/product.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ CurrencyPipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
}
