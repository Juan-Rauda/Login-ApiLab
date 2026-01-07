import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListarDocumentosPage } from './listar-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: ListarDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListarDocumentosPageRoutingModule {}
