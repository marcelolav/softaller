import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RepairService } from '../../services/repair.service';
import { RepairOrder } from '../../models/repair-order.model';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repair-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './repair-form.html',
  styleUrl: './repair-form.css'
})
export class RepairForm implements OnInit {
  repairForm: FormGroup;
  clients: Client[] = [];
  @Output() formClose = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private repairService: RepairService,
    private clientService: ClientService
  ) {
    this.repairForm = this.fb.group({
      clientId: ['', Validators.required],
      equipmentDetails: ['', Validators.required],
      issueDescription: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

  onSubmit(): void {
    if (this.repairForm.valid) {
      const selectedClient = this.clients.find(c => c.id === this.repairForm.value.clientId);
      if (!selectedClient) return;

      const newRepair: Omit<RepairOrder, 'id' | 'createdAt' | 'updatedAt'> = {
        clientName: `${selectedClient.name} ${selectedClient.lastName}`,
        equipmentDetails: this.repairForm.value.equipmentDetails,
        issueDescription: this.repairForm.value.issueDescription,
        status: this.repairForm.value.status
      };
      this.repairService.addRepair(newRepair)
        .then(() => {
          this.repairForm.reset({ status: 'Pending' });
          this.formClose.emit();
        })
        .catch(error => console.error('Error adding repair order: ', error));
    }
  }
}
