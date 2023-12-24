import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifyAlbaranPageRoutingModule } from './modify-albaran-routing.module';

import { ModifyAlbaranPage } from './modify-albaran.page';
import { ComponentsModule } from 'src/app/shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModifyAlbaranPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ModifyAlbaranPage],
})
export class ModifyAlbaranPageModule {}
