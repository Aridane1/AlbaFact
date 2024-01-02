import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerarClientesPageRoutingModule } from './generar-clientes-routing.module';

import { GenerarClientesPage } from './generar-clientes.page';
import { ComponentsModule } from 'src/app/shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerarClientesPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [GenerarClientesPage],
})
export class GenerarClientesPageModule {}
