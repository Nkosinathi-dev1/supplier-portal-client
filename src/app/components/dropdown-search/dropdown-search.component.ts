import { Component, OnInit } from '@angular/core';
import { SupplierService, SupplierDto } from '../../services/supplier.service';
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
  suppliers: SupplierDto[] = [];
  selectedCompany: SupplierDto | null = null;
  phoneNumber = '';
  loading = false;

  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    // Dummy list or fetch actual supplier names later
    this.suppliers = [
      { companyName: 'Nathi (Pty) Ltd', telephone: '' },
      { companyName: 'Eskom Holdings Limited', telephone: '' },
      { companyName: 'Focus Rooms (Pty) Ltd', telephone: '' }
    ];
  }

  searchPhone() {
    if (!this.selectedCompany) {
      this.phoneNumber = 'Please select a company.';
      return;
    }

    this.loading = true;
    this.supplierService.getSupplierPhone(this.selectedCompany.companyName)
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
}
