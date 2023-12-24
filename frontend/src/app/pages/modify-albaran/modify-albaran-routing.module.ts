import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifyAlbaranPage } from './modify-albaran.page';

const routes: Routes = [
  {
    path: '',
    component: ModifyAlbaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifyAlbaranPageRoutingModule {}
