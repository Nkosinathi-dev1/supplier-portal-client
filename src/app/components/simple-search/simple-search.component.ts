import { Component } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simple-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './simple-search.component.html',
  styleUrl: './simple-search.component.css'
})
export class SimpleSearchComponent {
  companyName = '';
  phoneNumber = '';
  loading = false;

  constructor(private supplierService: SupplierService) {}

  searchPhone() {
    if (!this.companyName.trim()) {
      this.phoneNumber = 'Please enter a company name.';
      return;
    }
    this.loading = true;
    this.phoneNumber = '';

    this.supplierService.getSupplierPhone(this.companyName)
      .subscribe({
        next: (phone) => {
          this.phoneNumber = `Phone: ${phone}`;
          this.loading = false;
        },
        error: (err) => {
          this.phoneNumber = err.error || 'Supplier not found.';
          this.loading = false;
        }
      });
  }

   /** Resets input and message */
   clearForm() {
    this.companyName = '';
    this.phoneNumber = '';
  }
}
