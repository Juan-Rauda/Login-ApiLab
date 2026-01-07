import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubirDocumentosPage } from './subir-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: SubirDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubirDocumentosPageRoutingModule {}
