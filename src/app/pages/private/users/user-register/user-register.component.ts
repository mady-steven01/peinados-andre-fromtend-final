import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  /** Atributos */
  formData!: FormGroup;
  roles: String[] = ['registered', 'moderator', 'admin' ];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      name: new FormControl( '' , [ Validators.required ] ),
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] ),
      role: new FormControl( '', [ Validators.required ] ),
      state: new FormControl( true, [ Validators.required ] )
    });
  }

  onSubmit() {
    // Obtiene los valores de los campos campos del formulario
    const inputData = this.formData.value;

    // Verifica el estado de validacion del formulario
    if( this.formData.valid ) {
      console.log( inputData );   // Enviar los datos al BackEnd

      this.usersService.registerUser( inputData ).subscribe({
        next: ( data ) => {
          console.log( data );
          console.log( 'User registered successfuly' );

          this.router.navigate([ 'dashboard','users' ]);
        },
        error: ( error ) => {
          console.error( error );
        },
        complete: () => {
          this.formData.reset();
        }
      });
    }

    this.formData.reset();    // Limpia los campos del formulario
  }
}
