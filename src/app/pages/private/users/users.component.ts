import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users',
  imports: [ RouterLink ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
    users: User[] = [];
    isLoading: boolean = true;

  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  get user () {
    return this.authService.user!;
  }

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: ( data ) => {
        console.log( data );
        console.log( 'Successfully obtains users' );

        // Eliminar el usuario autenticado de la lista & Asignara una lista vacia para evitar asignar undefined
        this.users = data.data?.filter( userItem => userItem._id !== this.user._id ) ?? [];
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

  onRemove( userId : string ) {

    if( ! userId ) {
      console.error( 'Invalid user ID' );
      return;
    }

    this.usersService.deleteUserById( userId ).subscribe({
      next: ( data ) => {
        console.log( data );
        console.log( 'Delete user successfully' );

        this.ngOnInit();    // Actualiza datos
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {},
    });
  }
}
