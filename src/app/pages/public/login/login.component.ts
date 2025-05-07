import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  /** Atributos */
  formData!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      username: new FormControl(
        '',
        [ Validators.required, Validators.email ]
      ),
      password: new FormControl(
        '',
        [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ]
       )
    });
  }

  onSubmit() {
    // Obtiene los valores de los campos campos del formulario
    const inputData = this.formData.value;

    // Verifica el estado de validacion del formulario
    if( this.formData.valid ) {
      console.log( inputData );   // Enviar los datos al BackEnd

      this.authService.loginUser( inputData ).subscribe({
        next: ( data ) => {
          console.log( data );

          /** Guarda token y datos del usuario en el localStorage */
          localStorage.setItem('token', data.token! );
          delete data.data?.password;
          localStorage.setItem('authUser', JSON.stringify( data.data ) );

          /** Redirecciona al Dashboard */
          this.router.navigateByUrl( 'dashboard' );
        },
        error: ( err ) => {
          console.error( err );
        },
        complete: () => {
          this.formData.reset();    // Limpia los campos del formulario
        }
      });
    }
  }
}
