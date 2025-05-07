import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-register',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './category-register.component.html',
  styleUrl: './category-register.component.css'
})
export class CategoryRegisterComponent {
  /** Atributos */
  formData!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      name: new FormControl( '', [ Validators.required ] ),
      description: new FormControl( '' )
    });
  }

  onSubmit() {
    // Obtiene los valores de los campos campos del formulario
    const inputData = this.formData.value;

    // Verifica el estado de validacion del formulario
    if( this.formData.valid ) {
      console.log( inputData );   // Enviar los datos al BackEnd

      // Vinculamos al Servicio que hace la peticion al BackEnd para registrar categoria
      this.categoryService.createCategory( inputData ).subscribe({
        next: ( data ) => {
          console.log( data );
          console.log( 'Register categories successfully ' );

          this.router.navigateByUrl( 'dashboard/categories' );  // Redirecciona
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();
        },
      });
    }

    this.formData.reset();    // Limpia los campos del formulario
  }
}
