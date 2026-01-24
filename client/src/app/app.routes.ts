import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'shop',
    loadComponent: () => import('./features/shop/shop.component').then((c) => c.ShopComponent),
  },
  {
    path: 'shop/:id',
    loadComponent: () =>
      import('./features/shop/product-details-component/product-details-component.component').then(
        (c) => c.ProductDetailsComponentComponent,
      ),
  },
  {
    path: 'test-error',
    loadComponent: () =>
      import('./features/test-error/test-error.component').then((c) => c.TestErrorComponent),
  },
  {
    path: 'server-error',
    loadComponent: () =>
      import('./shared/components/server-error/server-error.component').then(
        (c) => c.ServerErrorComponent,
      ),
  },
  {
    path: 'not-found',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
