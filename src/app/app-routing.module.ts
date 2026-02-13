import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule),
    canActivate: [noAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [noAuthGuard]
  },
  {
    path: 'tempsensor',
    loadChildren: () =>
      import('./pages/tempsensor/tempsensor.module')
        .then(m => m.TempsensorPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'subir-documentos',
    loadChildren: () =>
      import('./pages/subir-documentos/subir-documentos.module')
        .then(m => m.SubirDocumentosPageModule),
    canActivate: [authGuard]
  },

  {
    path: 'listar-documentos',
    loadChildren: () => import('./pages/listar-documentos/listar-documentos.module').then(m => m.ListarDocumentosPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
