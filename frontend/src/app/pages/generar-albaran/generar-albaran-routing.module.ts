import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarAlbaranPage } from './generar-albaran.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarAlbaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarAlbaranPageRoutingModule {}
