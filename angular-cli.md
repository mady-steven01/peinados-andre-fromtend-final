******** Lanzar la aplicacion Angular ********

ng serve --open
ng s -o

******** Crear Componente ********

ng generate component <path>/<name-component> --skip-tests

ng generate component pages/private/products --skip-tests     // Version Larga
ng g c pages/private/products --skip-tests                    // Version Abreviada

******** Crear Servicio ********

ng generate service <path>/<name-service> --skip-tests

ng generate service services/auth --skip-tests     // Version Larga
ng g s services/auth --skip-tests                  // Version Abreviada

******** Crear Interface ********

ng generate interface <path>/<name-interface> --skip-tests

ng generate interface interfaces/auth --skip-tests     // Version Larga
ng g i interfaces/auth --skip-tests                    // Version LargaAbreviada
