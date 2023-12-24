import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarAlbaranPageRoutingModule } from './generar-albaran-routing.module';

import { GenerarAlbaranPage } from './generar-albaran.page';
import { ComponentsModule } from 'src/app/shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComponentsModule,
    GenerarAlbaranPageRoutingModule,
  ],
  declarations: [GenerarAlbaranPage],
})
export class GenerarAlbaranPageModule {}
