import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from '../../../../services/users.service';
import { Response } from '../../../../interfaces/response';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-user-edit',
  imports: [ ReactiveFormsModule, JsonPipe ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent {
  /** Atributos */
  formData!: FormGroup;
  roles: String[] = ['registered', 'moderator', 'admin' ];
  userId!: string;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private router: Router
  ) {
    // Agrupacion de campos del formulario
    this.formData = new FormGroup({
      name: new FormControl( '' , [ Validators.required ] ),
      username: new FormControl( '', [ Validators.required, Validators.email ] ),
      // password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ), Validators.maxLength( 12 ) ] ),
      role: new FormControl( '', [ Validators.required ] ),
      state: new FormControl( true, [ Validators.required ] )
    });
  }

  ngOnInit() {
    this.getRouteId();
    this.loadFormData( this.userId );
  }

  private getRouteId () {
    this.route.paramMap.subscribe( ( params: Params ) => {
      this.userId = params[ 'get' ]( 'id' ) ?? '';
      console.log('ID del usuario:', this.userId );
    });
  }

  private loadFormData( categoryId: string ) {
      if ( categoryId ) {

        this.usersService.getUserById( categoryId ).subscribe({
          next: ( data: Response<User> ) => {
            console.log( data );

            // Establece nuevos valores para el formulario
            this.formData.patchValue({
              name: data?.data?.name,
              username: data?.data?.username,
              password: data?.data?.password,
              role: data?.data?.role,
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
      this.usersService.updateUserById( this.userId, inputData ).subscribe({
        next: ( data ) => {
          console.log( data );
          console.log( 'Update users successfully' );

          this.router.navigate([ 'dashboard','users' ]);
        },
        error: ( error ) => {
          console.log( error );
        },
        complete: () => {
          this.formData.reset();    // Limpia los campos del formulario
        }
      });
    }
  }
}
