import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainLayout } from './main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayout, // Layout que contiene el menú
    children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'sensores',
        loadComponent: () => import('./sensores/sensores.page').then(m => m.SensoresPage)
      },
      {
        path: 'quimicos',
        loadComponent: () => import('./quimicos/quimicos.page').then( m => m.QuimicosPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
