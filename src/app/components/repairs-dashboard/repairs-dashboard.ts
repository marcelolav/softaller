import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepairList } from '../repair-list/repair-list';
import { RepairForm } from '../repair-form/repair-form';

@Component({
  selector: 'app-repairs-dashboard',
  standalone: true,
  imports: [CommonModule, RepairList, RepairForm],
  templateUrl: './repairs-dashboard.html',
  styleUrl: './repairs-dashboard.css'
})
export class RepairsDashboard {
  isFormVisible = false;

  toggleForm(): void {
    this.isFormVisible = !this.isFormVisible;
  }
}
