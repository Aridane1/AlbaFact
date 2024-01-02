import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './shared/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'albaranes',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/albaranes/albaranes.module').then(
        (m) => m.AlbaranesPageModule
      ),
  },
  {
    path: 'productos',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/productos/productos.module').then(
        (m) => m.ProductosPageModule
      ),
  },
  {
    path: 'generar-producto',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/generar-producto/generar-producto.module').then(
        (m) => m.GenerarProductoPageModule
      ),
  },
  {
    path: 'generar-albaran',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/generar-albaran/generar-albaran.module').then(
        (m) => m.GenerarAlbaranPageModule
      ),
  },
  {
    path: 'modify-albaran',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/modify-albaran/modify-albaran.module').then(
        (m) => m.ModifyAlbaranPageModule
      ),
  },
  {
    path: 'generar-factura',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/generar-factura/generar-factura.module').then(
        (m) => m.GenerarFacturaPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'clientes',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/clientes/clientes.module').then(
        (m) => m.ClientesPageModule
      ),
  },
  {
    path: 'generar-clientes',
    canActivate: [GuardGuard],
    loadChildren: () =>
      import('./pages/generar-clientes/generar-clientes.module').then(
        (m) => m.GenerarClientesPageModule
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
