import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerarClientesPage } from './generar-clientes.page';

const routes: Routes = [
  {
    path: '',
    component: GenerarClientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerarClientesPageRoutingModule {}
