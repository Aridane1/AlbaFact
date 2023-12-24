import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarProductoPage } from './generar-producto.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarProductoPageRoutingModule {}
