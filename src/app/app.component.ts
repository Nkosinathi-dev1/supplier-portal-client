import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleSearchComponent } from "./components/simple-search/simple-search.component";
import { DropdownSearchComponent } from "./components/dropdown-search/dropdown-search.component";
import { MultiSelectSearchComponent } from "./components/multi-select-search/multi-select-search.component";
import { AddSupplierComponent } from "./components/add-supplier/add-supplier.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, SimpleSearchComponent, DropdownSearchComponent, MultiSelectSearchComponent, AddSupplierComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'supplier-portal';

  @ViewChild(DropdownSearchComponent) dropdownSearch!: DropdownSearchComponent;
  @ViewChild(MultiSelectSearchComponent) multiSelectSearch!: MultiSelectSearchComponent;

  reloadDropdowns() {
    this.dropdownSearch.loadSuppliers(1);
    this.multiSelectSearch.loadSuppliers(1);
  }
}
