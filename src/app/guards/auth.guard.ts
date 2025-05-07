import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.verifyAuthenticatedUser().pipe(
    map( isAuthenticated => {
      console.log( 'noAuthGuard', isAuthenticated );

      /** Si NO esta autenticado */
      if ( ! isAuthenticated ) {
        router.navigate([ '/login' ]);  // Redirige al login si no está autenticado
        return false;                   // Bloquea el acceso
      }

      return true;                      // Permite el acceso si está autenticado
    }),
    catchError(( error ) => {
      console.error( error );
      router.navigate(['/']);           // Redirige a home en caso de error
      return [ false ];                 // Bloquea el acceso en caso de error
    })
  );
};
