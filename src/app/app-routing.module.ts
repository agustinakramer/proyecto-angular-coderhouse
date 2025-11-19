import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './featured/dashboard/students/students.component';
import { LoginComponent } from './featured/auth/login/login.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'login', 
    component: LoginComponent,
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./featured/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
