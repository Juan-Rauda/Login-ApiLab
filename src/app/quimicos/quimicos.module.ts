import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuimicosPageRoutingModule } from './quimicos-routing.module';

import { QuimicosPage } from './quimicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuimicosPageRoutingModule
  ],
  declarations: [QuimicosPage]
})
export class QuimicosPageModule {}
