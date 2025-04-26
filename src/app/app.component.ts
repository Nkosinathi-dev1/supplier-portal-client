import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimpleSearchComponent } from "./components/simple-search/simple-search.component";
import { DropdownSearchComponent } from "./components/dropdown-search/dropdown-search.component";
import { MultiSelectSearchComponent } from "./components/multi-select-search/multi-select-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ FormsModule, SimpleSearchComponent, DropdownSearchComponent, MultiSelectSearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'supplier-portal';
}
