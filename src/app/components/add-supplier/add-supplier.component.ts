import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupplierService, SupplierDto } from '../../services/supplier.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-supplier',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent {
  companyName = '';
  telephone = '';
  message = '';
  loading = false;

  @Output() supplierAdded = new EventEmitter<void>();

  constructor(private supplierService: SupplierService) {}

  onSubmit() {
    if (!this.companyName.trim() || !this.telephone.trim()) {
      this.message = 'Please fill in both fields.';
      return;
    }

    const newSupplier: SupplierDto = {
      companyName: this.companyName,
      telephone: this.telephone
    };

    this.loading = true;
    this.supplierService.addSupplier(newSupplier).subscribe({
      next: () => {
        this.message = 'Supplier added successfully!';
        this.companyName = '';
        this.telephone = '';
        this.clearForm(false); 
        this.loading = false;

        this.supplierAdded.emit();
      },
      error: (err) => {
        this.message = err.error || 'Failed to add supplier.';
        this.loading = false;
      }
    });
  }

  clearForm(resetMessage: boolean = true) {
    this.companyName = '';
    this.telephone   = '';
    if (resetMessage) this.message = '';
  }
}
