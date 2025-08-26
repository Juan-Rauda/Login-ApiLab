import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quimicos',
  templateUrl: './quimicos.page.html',
  styleUrls: ['./quimicos.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule
  ]
})
export class QuimicosPage {}
