import { Component, OnInit } from '@angular/core';
import { SupplierService, SupplierDto, SupplierDropdownDto } from '../../services/supplier.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dropdown-search',
  imports: [FormsModule, NgSelectModule, CommonModule],
  templateUrl: './dropdown-search.component.html',
  styleUrl: './dropdown-search.component.css'
})
export class DropdownSearchComponent implements OnInit {
  suppliers: SupplierDropdownDto[] = [];
  selectedCompanyId: number | null = null;
  phoneNumber = '';
  loading = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.loadSuppliers(1); // Load first page
  }

  loadSuppliers(page: number) {
    this.supplierService.getDropdownSuppliers(page, 10).subscribe({
      next: (data) => this.suppliers = data,
      error: (err) => console.error('Failed to load suppliers', err)
    });
  }

  searchPhoneById() {
    if (!this.selectedCompanyId) {
      this.phoneNumber = 'Please select a company.';
      return;
    }

    this.loading = true;

    this.supplierService.getSuppliersByIds([this.selectedCompanyId]).subscribe({
        next: (suppliers) => {
          if (suppliers.length > 0) {
            const supplier = suppliers[0];
            this.phoneNumber = `Phone for ${supplier.companyName}: ${supplier.telephone}`;
          } else {
            this.phoneNumber = 'Supplier not found.';
          }
          this.loading = false;
        },
        error: (err: any) => {
          this.phoneNumber = err.error || 'Supplier not found.';
          this.loading = false;
        }
      });
    }

  }