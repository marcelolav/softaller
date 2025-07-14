import { Routes } from '@angular/router';

import { RepairsDashboard } from './components/repairs-dashboard/repairs-dashboard';
import { ClientListComponent } from './components/client-list/client-list';
import { ClientFormComponent } from './components/client-form/client-form';
import { RepairCloseFormComponent } from './components/repair-close-form/repair-close-form';

export const routes: Routes = [
  { path: 'reparaciones', component: RepairsDashboard },
  { path: 'repairs/close/:id', component: RepairCloseFormComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/edit/:id', component: ClientFormComponent },
  { path: '**', redirectTo: 'reparaciones', pathMatch: 'full' }
];
