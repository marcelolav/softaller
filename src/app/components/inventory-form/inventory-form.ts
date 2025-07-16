import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../models/inventory-item.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-inventory-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-form.html',
  styleUrls: ['./inventory-form.css']
})
export class InventoryFormComponent implements OnInit {
  inventoryForm!: FormGroup;
  isEditMode = false;
  private itemId!: string;

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.inventoryForm = this.fb.group({
      barcode: ['', Validators.required],
      description: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unitOfMeasure: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      sellingPrice: [0, [Validators.required, Validators.min(0)]]
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.itemId = id;
        this.inventoryService.getInventoryItem(id).subscribe(item => {
          this.inventoryForm.patchValue(item);
        });
      }
    });

    this.inventoryForm.get('barcode')?.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(async barcode => {
      if (barcode && barcode.length > 0) {
        const item = await this.inventoryService.getItemByBarcode(barcode);
        if (item) {
          this.isEditMode = true;
          this.itemId = item.id;
          this.inventoryForm.patchValue(item, { emitEvent: false });
        } else {
          this.isEditMode = false;
          const currentBarcode = this.inventoryForm.get('barcode')?.value;
          this.inventoryForm.reset({ emitEvent: false });
          this.inventoryForm.get('barcode')?.setValue(currentBarcode, { emitEvent: false });
        }
      } else {
        this.isEditMode = false;
        this.inventoryForm.reset({ emitEvent: false });
      }
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      if (this.isEditMode) {
        const updatedItem: InventoryItem = { id: this.itemId, ...this.inventoryForm.value };
        this.inventoryService.updateInventoryItem(updatedItem);
      } else {
        this.inventoryService.addInventoryItem(this.inventoryForm.value);
      }
      this.router.navigate(['/inventory']);
    }
  }
}