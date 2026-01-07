import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

// Registrar los módulos de Swiper
SwiperCore.use([Autoplay, Navigation, Pagination]);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    SwiperModule 
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
