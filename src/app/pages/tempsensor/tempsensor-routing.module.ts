import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TempsensorPage } from './tempsensor.page';

const routes: Routes = [
  {
    path: '',
    component: TempsensorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TempsensorPageRoutingModule {}
