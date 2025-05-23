import { Routes } from '@angular/router';
import { HomeComponent } from './pages/public/home/home.component';
import { LoginComponent } from './pages/public/login/login.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { DashboardComponent } from './pages/private/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/public/page-not-found/page-not-found.component';
import { UsersComponent } from './pages/private/users/users.component';
import { UserRegisterComponent } from './pages/private/users/user-register/user-register.component';
import { CategoriesComponent } from './pages/private/categories/categories.component';
import { CategoryRegisterComponent } from './pages/private/categories/category-register/category-register.component';
import { ProductsComponent } from './pages/private/products/products.component';
import { ProductRegisterComponent } from './pages/private/products/product-register/product-register.component';
import { CategoryEditComponent } from './pages/private/categories/category-edit/category-edit.component';
import { ProductEditComponent } from './pages/private/products/product-edit/product-edit.component';
import { UserEditComponent } from './pages/private/users/user-edit/user-edit.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}, 
    { path: 'dashboard', component: DashboardComponent}, 
    { path: '404', component: PageNotFoundComponent },
    { path: 'dashboard/users', component: UsersComponent}, 
    { path: 'dashboard/products', component: ProductsComponent}, 
    { path: 'dashboard/categories', component: CategoriesComponent}, 
    { path: 'dashboard/user/new', component: UserRegisterComponent}, 
    { path: 'dashboard/user/edit/:id', component: UserEditComponent},
    { path: 'dashboard/product/new', component: ProductRegisterComponent}, 
    { path: 'dashboard/product/edit/:id', component: ProductEditComponent},
    { path: 'dashboard/category/new', component: CategoryRegisterComponent},
    { path: 'dashboard/category/edit/:id', component: CategoryEditComponent}, 
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];
