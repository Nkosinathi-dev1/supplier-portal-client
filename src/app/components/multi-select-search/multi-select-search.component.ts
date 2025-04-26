import { Component, OnInit } from '@angular/core';
import { SupplierService, SupplierDto } from '../../services/supplier.service';
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
  suppliers: SupplierDto[] = [];
  selectedCompanies: SupplierDto[] = [];
  results: string[] = [];
  loading = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.suppliers = [
      { companyName: 'Nathi (Pty) Ltd', telephone: '' },
      { companyName: 'Eskom Holdings Limited', telephone: '' },
      { companyName: 'Focus Rooms (Pty) Ltd', telephone: '' }
    ];
  }

  searchPhones() {
    if (this.selectedCompanies.length === 0) {
      this.results = ['Please select at least one company.'];
      return;
    }

    this.results = [];
    this.loading = true;

    const requests = this.selectedCompanies.map(company =>
      this.supplierService.getSupplierPhone(company.companyName)
        .toPromise()
        .then(phone => `${company.companyName}: ${phone}`)
        .catch(err => `${company.companyName}: ${err.error || 'Not found'}`)
    );

    Promise.all(requests).then(res => {
      this.results = res;
      this.loading = false;
    });
  }
}
