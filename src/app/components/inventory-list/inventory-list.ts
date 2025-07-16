import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item.model';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inventory-list.html',
  styleUrls: ['./inventory-list.css']
})
export class InventoryListComponent implements OnInit {
  inventory$: Observable<InventoryItem[]>;

  constructor(private inventoryService: InventoryService, private router: Router) {
    this.inventory$ = this.inventoryService.getInventoryItems();
   }

  ngOnInit(): void {
  }

  search(event: Event): void {
    const barcode = (event.target as HTMLInputElement).value;
    if (barcode) {
      this.inventory$ = this.inventoryService.searchItemsByBarcode(barcode);
    } else {
      this.inventory$ = this.inventoryService.getInventoryItems();
    }
  }

  deleteItem(id: string): void {
    this.inventoryService.deleteInventoryItem(id);
  }

  addItem(): void {
    this.router.navigate(['/inventory/new']);
  }

  editItem(id: string): void {
    this.router.navigate(['/inventory/edit', id]);
  }
}