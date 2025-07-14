import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { RepairOrder } from '../../models/repair-order.model';
import { RepairService } from '../../services/repair.service';

@Component({
  selector: 'app-repair-list',
  imports: [CommonModule],
  templateUrl: './repair-list.html',
  styleUrl: './repair-list.css'
})
export class RepairList implements OnInit {
  repairs$: Observable<RepairOrder[]>;

  constructor(private repairService: RepairService) {
    this.repairs$ = this.repairService.getRepairs();
  }

  ngOnInit(): void { }

  deleteRepair(id: string): void {
    if (confirm('Are you sure you want to delete this repair order?')) {
      this.repairService.deleteRepair(id)
        .catch(error => console.error('Error deleting repair order: ', error));
    }
  }
}
