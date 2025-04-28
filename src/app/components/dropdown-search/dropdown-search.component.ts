import { Component, OnInit } from '@angular/core';
import { SupplierService, SupplierDto, SupplierDropdownDto } from '../../services/supplier.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';



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

  page = 1;
  pageSize = 10;
  loadingSuppliers = false;
  allLoaded = false;

  typeahead$: Subject<string> = new Subject<string>();


  constructor(private supplierService: SupplierService) {}

  ngOnInit() {
    this.loadSuppliers();
  }

  loadSuppliers() {
    if (this.loadingSuppliers || this.allLoaded) return;

    this.loadingSuppliers = true;

    this.supplierService.getDropdownSuppliers(this.page, this.pageSize).subscribe({
      next: (data) => {
        if (data.length < this.pageSize) {
          this.allLoaded = true;
        }
        this.suppliers = [...this.suppliers, ...data];
        this.page++;
        this.loadingSuppliers = false;
      },
      error: (err) => {
        console.error('Failed to load suppliers', err);
        this.loadingSuppliers = false;
      }
    });
  }

  onScrollToEnd() {
    this.loadSuppliers();
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
            this.phoneNumber = `${supplier.companyName} - ${supplier.telephone}`;
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