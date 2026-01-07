import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TempsensorPageRoutingModule } from './tempsensor-routing.module';

import { TempsensorPage } from './tempsensor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TempsensorPageRoutingModule
  ],
  declarations: [TempsensorPage]
})
export class TempsensorPageModule {}
