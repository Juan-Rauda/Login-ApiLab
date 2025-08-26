import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sensores',
  templateUrl: './sensores.page.html',
  styleUrls: ['./sensores.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class SensoresPage {}
