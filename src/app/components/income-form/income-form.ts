import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Income } from '../../services/income';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './income-form.html',
  styleUrl: './income-form.css'
})
export class IncomeForm implements OnInit {
  incomeForm: FormGroup;
  isEditMode = false;
  productId: string | null = null;
constructor(
    private fb: FormBuilder,
    private incomeService: Income,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.incomeForm = this.fb.group({
      productId: ['', Validators.required],
      productName: ['', Validators.required],
      quantityIncome: [0, Validators.required],
      purchasePrice: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
 
    }
  }
}
