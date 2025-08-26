import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SensoresPage } from './sensores.page'; // importa tu componente standalone

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SensoresPage  // <-- Importas el componente aquí
  ],
})
export class SensoresModule {}
