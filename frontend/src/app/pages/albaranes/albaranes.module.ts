import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlbaranesPageRoutingModule } from './albaranes-routing.module';

import { AlbaranesPage } from './albaranes.page';
import { ComponentsModule } from 'src/app/shared/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlbaranesPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [AlbaranesPage],
})
export class AlbaranesPageModule {}
