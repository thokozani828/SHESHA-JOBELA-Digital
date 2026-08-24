/* app.routes.ts - Complete Routes Configuration */
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'services',
    loadComponent: () => import('./services/services.page').then((m) => m.ServicesPage),
  },
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.page').then((m) => m.BookingPage),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.page').then((m) => m.ContactPage),
  },
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];