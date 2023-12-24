import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../components/menu/menu.component';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { YearButtonComponent } from '../components/year-button/year-button.component';
import { TableComponent } from '../components/table/table.component';

@NgModule({
  declarations: [MenuComponent, YearButtonComponent, TableComponent],
  imports: [CommonModule, RouterModule, IonicModule],
  exports: [MenuComponent, YearButtonComponent, TableComponent],
})
export class ComponentsModule {}
