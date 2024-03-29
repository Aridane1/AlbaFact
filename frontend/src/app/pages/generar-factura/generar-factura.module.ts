import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarFacturaPageRoutingModule } from './generar-factura-routing.module';

import { GenerarFacturaPage } from './generar-factura.page';
import { ComponentsModule } from 'src/app/shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarFacturaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [GenerarFacturaPage],
})
export class GenerarFacturaPageModule {}
