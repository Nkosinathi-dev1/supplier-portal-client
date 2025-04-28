import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleSearchComponent } from "./components/simple-search/simple-search.component";
import { DropdownSearchComponent } from "./components/dropdown-search/dropdown-search.component";
import { MultiSelectSearchComponent } from "./components/multi-select-search/multi-select-search.component";
import { AddSupplierComponent } from "./components/add-supplier/add-supplier.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, SimpleSearchComponent, DropdownSearchComponent, MultiSelectSearchComponent, AddSupplierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'supplier-portal';

  activeTab: 'simple' | 'dropdown' | 'multi' = 'simple';

  @ViewChild(DropdownSearchComponent) dropdownSearch!: DropdownSearchComponent;
  @ViewChild(MultiSelectSearchComponent) multiSelectSearch!: MultiSelectSearchComponent;

  ngAfterViewInit() {
    // Optionally preload dropdowns here
    this.dropdownSearch.loadSuppliers(1);
    this.multiSelectSearch.loadSuppliers(1);
  }

  reloadDropdowns() {
    // Check if components are available
    if (this.dropdownSearch) {
      this.dropdownSearch.loadSuppliers(1);
    }

    if (this.multiSelectSearch) {
      this.multiSelectSearch.loadSuppliers(1);
    }
  }
}
