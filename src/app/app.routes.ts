import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./components/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./components/auth/signup/signup.component').then(m => m.SignupComponent),
  },
  {
    path: 'employees',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/employees/employee-list/employee-list.component').then(
            m => m.EmployeeListComponent
          ),
      },
      {
        path: 'add',
        loadComponent: () =>
          import('./components/employees/employee-add/employee-add.component').then(
            m => m.EmployeeAddComponent
          ),
      },
      {
        path: 'view/:id',
        loadComponent: () =>
          import('./components/employees/employee-view/employee-view.component').then(
            m => m.EmployeeViewComponent
          ),
      },
      {
        path: 'update/:id',
        loadComponent: () =>
          import('./components/employees/employee-update/employee-update.component').then(
            m => m.EmployeeUpdateComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '/login' },
];
