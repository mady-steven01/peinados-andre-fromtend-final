import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { Response } from '../../../../interfaces/response';
import { Category } from '../../../../interfaces/category';

@Component({
  selector: 'app-category-edit',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css'
})
export class CategoryEditComponent {
  /** Atributos */
  formData!: FormGroup;
  categoryId!: string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' )
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
      this.categoryId = params.get( 'id' ) ?? '';
      console.log('ID de la categoría:', this.categoryId );

      this.loadFormData( this.categoryId );   // Obtener los datos de la categoria por ID y cargarlo en el formulario
    });
  }

  private loadFormData( categoryId: string ) {
    if ( categoryId ) {

      this.categoryService.getCategoryById( categoryId ).subscribe({
        next: ( data: Response<Category> ) => {
          console.log( data );

          // Establece nuevos valores para el formulario
          this.formData.patchValue({
            name: data?.data?.name,
            description: data?.data?.description
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

      // Vinculamos al Servicio que hace la peticion al BackEnd para actualizar la categoria
      this.categoryService.updateCategoryById( this.categoryId, inputData ).subscribe({
        next: ( data ) => {
          console.log( data );
          console.log( 'Update categories successfully' );

          this.router.navigateByUrl( 'dashboard/categories' );  // Redirecciona
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();    // Limpia los campos del formulario
        },
      });

    }
  }
}
