import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'albaranes',
    loadChildren: () =>
      import('./pages/albaranes/albaranes.module').then(
        (m) => m.AlbaranesPageModule
      ),
  },
  {
    path: 'productos',
    loadChildren: () =>
      import('./pages/productos/productos.module').then(
        (m) => m.ProductosPageModule
      ),
  },
  {
    path: 'generar-producto',
    loadChildren: () =>
      import('./pages/generar-producto/generar-producto.module').then(
        (m) => m.GenerarProductoPageModule
      ),
  },
  {
    path: 'generar-albaran',
    loadChildren: () =>
      import('./pages/generar-albaran/generar-albaran.module').then(
        (m) => m.GenerarAlbaranPageModule
      ),
  },
  {
    path: 'modify-albaran',
    loadChildren: () =>
      import('./pages/modify-albaran/modify-albaran.module').then(
        (m) => m.ModifyAlbaranPageModule
      ),
  },
  {
    path: 'generar-factura',
    loadChildren: () =>
      import('./pages/generar-factura/generar-factura.module').then(
        (m) => m.GenerarFacturaPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
