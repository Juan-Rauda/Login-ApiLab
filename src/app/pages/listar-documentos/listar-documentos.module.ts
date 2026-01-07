import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListarDocumentosPageRoutingModule } from './listar-documentos-routing.module';

import { ListarDocumentosPage } from './listar-documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListarDocumentosPageRoutingModule
  ],
  declarations: [ListarDocumentosPage]
})
export class ListarDocumentosPageModule {}
