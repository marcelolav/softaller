import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { RepairOrder } from '../../models/repair-order.model';
import { RepairService } from '../../services/repair.service';

@Component({
  selector: 'app-repair-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
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
    if (confirm('Está seguro de eliminar esta orden de reparación?')) {
      this.repairService.deleteRepair(id)
        .catch(error => console.error('Error al eliminar la orden de reparación: ', error));
    }
  }
}
