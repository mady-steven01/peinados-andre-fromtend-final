import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../interfaces/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [ RouterLink ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  categories: Category[] = [];
  isLoading: boolean = true;

  constructor( private categoryService: CategoryService ) {}

  ngOnInit() {
    this.categoryService.getCategories().subscribe({
      next: ( data ) => {
        console.log( data );
        console.log( 'Successfully obtains categories' );

        this.categories = data.data ?? [];    // Asignara una lista vacia para evitar asignar undefined
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

  onRemove( categoryId : string ) {

    if( ! categoryId ) {
      console.error( 'Invalid category ID' );
      return;
    }

    this.categoryService.deleteCategoryById( categoryId ).subscribe({
      next: ( data ) => {
        console.log( data );
        console.log( 'Delete category successfully' );

        this.ngOnInit();    // Actualiza datos
      },
      error: ( error ) => {
        console.error( error );
      },
      complete: () => {},
    });
  }
}
