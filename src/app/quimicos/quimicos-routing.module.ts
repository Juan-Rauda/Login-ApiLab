import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuimicosPage } from './quimicos.page';

const routes: Routes = [
  {
    path: '',
    component: QuimicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuimicosRoutingModule {}