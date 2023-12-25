import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarFacturaPage } from './generar-factura.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarFacturaPageRoutingModule {}
