import { Component, OnInit } from '@angular/core';
import { SupplierService, SupplierDto, SupplierDropdownDto } from '../../services/supplier.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-multi-select-search',
  imports: [FormsModule, CommonModule, NgSelectModule],
  templateUrl: './multi-select-search.component.html',
  styleUrl: './multi-select-search.component.css'
})
export class MultiSelectSearchComponent implements OnInit {
  suppliers: SupplierDropdownDto[] = [];
  selectedCompanyIds: number[] = [];
  results: string[] = [];
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

  searchPhonesByIds() {
    if (this.selectedCompanyIds.length === 0) {
      this.results = ['Please select at least one company.'];
      return;
    }

    this.loading = true;

    this.supplierService.getSuppliersByIds(this.selectedCompanyIds).subscribe({
      next: (suppliers) => {
        this.results = suppliers.map(s => `${s.companyName}: ${s.telephone}`);
        this.loading = false;
      },
      error: (err) => {
        this.results = ['Error fetching suppliers.'];
        this.loading = false;
      }
    });
  }
}
