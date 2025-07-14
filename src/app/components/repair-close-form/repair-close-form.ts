import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RepairService } from '../../services/repair.service';
import { ClientService } from '../../services/client.service';
import { RepairOrder } from '../../models/repair-order.model';
import { Client } from '../../models/client';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-repair-close-form',
  templateUrl: './repair-close-form.html',
  styleUrls: ['./repair-close-form.css'],
  imports: [ReactiveFormsModule]
})
export class RepairCloseFormComponent implements OnInit {
  form: FormGroup;
  repairOrder: RepairOrder | undefined;
  client: Client | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private repairService: RepairService,
    private clientService: ClientService
  ) {
    this.form = this.fb.group({
      materiales: ['', Validators.required],
      precioMateriales: [0, [Validators.required, Validators.min(0)]],
      precioManoDeObra: [0, [Validators.required, Validators.min(0)]],
      trabajoRealizado: ['', Validators.required],
      total: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.repairService.getRepairOrder(id).subscribe((repairOrder: RepairOrder) => {
        this.repairOrder = repairOrder;
        if (this.repairOrder) {
          this.clientService.getClient(this.repairOrder.clientId).subscribe(client => {
            this.client = client;
          });
        }
      });
    }

    this.form.get('precioMateriales')?.valueChanges.subscribe(() => this.updateTotal());
    this.form.get('precioManoDeObra')?.valueChanges.subscribe(() => this.updateTotal());
  }

  updateTotal() {
    const precioMateriales = this.form.get('precioMateriales')?.value || 0;
    const precioManoDeObra = this.form.get('precioManoDeObra')?.value || 0;
    this.form.get('total')?.setValue(precioMateriales + precioManoDeObra);
  }

  save() {
    if (this.form.valid) {
      // Logic to save the form data
      console.log(this.form.value);
    }
  }

  print() {
    if (!this.client) {
      return;
    }
    const printContent = `
      <h1>Resumen de Reparación</h1>
      <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
      <p><strong>Cliente:</strong> ${this.client.name}</p>
      <p><strong>Trabajo Realizado:</strong> ${this.form.get('trabajoRealizado')?.value}</p>
      <p><strong>Total:</strong> ${this.form.get('total')?.value}</p>
    `;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  }
}