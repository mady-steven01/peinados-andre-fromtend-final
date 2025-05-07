import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  /** Atributos */
  formData!: FormGroup;

  constructor( private authService: AuthService ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      name: new FormControl( '' , [ Validators.required ] ),
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] )
    });
  }

  onSubmit() {
    // Obtiene los valores de los campos campos del formulario
    const inputData = this.formData.value;

    // Verifica el estado de validacion del formulario
    if( this.formData.valid ) {
      console.log( inputData );   // Enviar los datos al BackEnd
      
      // Invoque al servicio de usuario: Sintaxis con funciones callback (Obsoleta - Legacy)
      // this.authService.registerUser( inputData ).subscribe( 
      //   ( data ) => {
      //     console.log( data );
      //   }, 
      //   ( error ) => {
      //     console.error( error );
      //   }
      // );

      // Invoque al servicio de usuario: Sintaxis con objeto observador (Moderna - Angular 19)
      this.authService.registerUser( inputData ).subscribe({
        next: ( data ) => {
          console.log( data );
        },
        error: ( err ) => {
          console.error( err );
        },
        complete: () => {
          console.log( 'Registro exitoso' );
          this.formData.reset();    // Limpia los campos del formulario
        } 
      });

    }

  }
}
