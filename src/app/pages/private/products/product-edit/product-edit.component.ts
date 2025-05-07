import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Response } from '../../../../interfaces/response';
import { Category } from '../../../../interfaces/category';
import { Product } from '../../../../interfaces/product';

@Component({
  selector: 'app-product-edit',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent {
  /** Atributos */
  formData!: FormGroup;
  categories!: Array<Category>;
  productId!: string;

  constructor(
      private productService: ProductService,
      private categoryService: CategoryService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      name: new FormControl( '' , [ Validators.required ] ),
      description: new FormControl( '' ),
      price: new FormControl( 0 , [ Validators.required, Validators.min( 0 ) ] ),
      urlImage: new FormControl( '' ),
      category: new FormControl( '', [ Validators.required ] ),
      state: new FormControl( true, [ Validators.required ] )
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.getRouteId();
    this.loadFormData( this.productId );
  }

  private loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: ( data ) => {
        console.log( data.data );    // { ok: true, data: [{...},{...},{...},{...}] }
        this.categories = data.data ?? [];

        console.log( 'Categories obtained successfuly' );
      },
      error: ( error ) => {
        console.error( error );
      }
    });
  }

  private getRouteId () {
    this.route.paramMap.subscribe( params => {
      this.productId = params.get( 'id' ) ?? '';
      console.log('ID de la categoría:', this.productId );
    });
  }

  private loadFormData( categoryId: string ) {
    if ( categoryId ) {

      this.productService.getProductById( categoryId ).subscribe({
        next: ( data: Response<Product> ) => {
          console.log( data );

          // Establece nuevos valores para el formulario
          this.formData.patchValue({
            name: data?.data?.name,
            description: data?.data?.description,
            price: data?.data?.price,
            urlImage: data?.data?.urlImage,
            category: data?.data?.category,
            state: data?.data?.state,
            // TODO: userId guarda el usuario que lo creó. Validar crear un atributo para saber el userId de quien lo modificó
          });
        },
        error: (error) => {
          console.error( error );
        }
      });
    }
  }

  onSubmit() {
    // Obtiene los valores de los campos campos del formulario
    const inputData = this.formData.value;

    // Verifica el estado de validacion del formulario
    if( this.formData.valid ) {
      console.log( inputData );   // Enviar los datos al BackEnd

      // Usar el servicio para conectar con el backend y enviar los valores capturados por el formulario
      this.productService.updateProductById( this.productId, inputData ).subscribe({
        next: ( data ) => {
          console.log( data );
          console.log( 'Update categories successfully' );
          // this.router.navigateByUrl( 'dashboard/products' );
          this.router.navigate([ 'dashboard','products' ]);
        },
        error: ( error ) => {
          console.log( error );
        },
        complete: () => {
          this.formData.reset();
        }
      });
    }

  }
}
