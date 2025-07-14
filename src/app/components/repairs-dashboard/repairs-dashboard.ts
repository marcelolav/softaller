import { Component } from '@angular/core';
import { RepairList } from '../repair-list/repair-list';
import { RepairForm } from '../repair-form/repair-form';

@Component({
  selector: 'app-repairs-dashboard',
  imports: [RepairList, RepairForm],
  templateUrl: './repairs-dashboard.html',
  styleUrl: './repairs-dashboard.css'
})
export class RepairsDashboard {

}
