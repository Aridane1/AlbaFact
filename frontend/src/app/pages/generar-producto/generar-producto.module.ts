import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarProductoPageRoutingModule } from './generar-producto-routing.module';

import { GenerarProductoPage } from './generar-producto.page';
import { ComponentsModule } from 'src/app/shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GenerarProductoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [GenerarProductoPage],
})
export class GenerarProductoPageModule {}
