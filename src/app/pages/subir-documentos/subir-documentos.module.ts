import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubirDocumentosPageRoutingModule } from './subir-documentos-routing.module';

import { SubirDocumentosPage } from './subir-documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubirDocumentosPageRoutingModule
  ],
  declarations: [SubirDocumentosPage]
})
export class SubirDocumentosPageModule {

  
}
