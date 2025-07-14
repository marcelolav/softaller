import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  isEditMode = false;
  clientId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.isEditMode = true;
      this.clientService.getClient(this.clientId).subscribe(client => {
        if (client) {
          this.clientForm.patchValue(client);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      if (this.isEditMode && this.clientId) {
        const updatedClient: Client = { id: this.clientId, ...this.clientForm.value };
        this.clientService.updateClient(updatedClient).subscribe(() => {
          this.router.navigate(['/clients']);
        });
      } else {
        this.clientService.addClient(this.clientForm.value).subscribe(() => {
          this.router.navigate(['/clients']);
        });
      }
    }
  }
}
