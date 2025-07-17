import { Routes } from '@angular/router';

import { RepairsDashboard } from './components/repairs-dashboard/repairs-dashboard';
import { ClientListComponent } from './components/client-list/client-list';
import { ClientFormComponent } from './components/client-form/client-form';
import { RepairCloseFormComponent } from './components/repair-close-form/repair-close-form';
import { InventoryListComponent } from './components/inventory-list/inventory-list';
import { InventoryFormComponent } from './components/inventory-form/inventory-form';
import { IncomeList } from './components/income-list/income-list';
import { IncomeForm } from './components/income-form/income-form';

export const routes: Routes = [
  { path: '', component: RepairsDashboard },
  { path: 'repairs/close/:id', component: RepairCloseFormComponent },
  { path: 'clients', component: ClientListComponent },
  { path: 'clients/new', component: ClientFormComponent },
  { path: 'clients/edit/:id', component: ClientFormComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'inventory/new', component: InventoryFormComponent },
  { path: 'inventory/edit/:id', component: InventoryFormComponent },
  { path: 'income', component: IncomeList },
  { path: 'income/new', component: IncomeForm },
  { path: 'income/edit/:id', component: IncomeForm },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
