import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface SupplierDto {
  companyName: string;
  telephone: string;
}

export interface SupplierDropdownDto {
  id: number;
  companyName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private baseUrl = 'https://localhost:7158';
  
  constructor(private http: HttpClient) { }

  addSupplier(dto: SupplierDto): Observable<SupplierDto> {
    return this.http.post<SupplierDto>(`${this.baseUrl}/suppliers`, dto);
  }

  getSupplierPhone(companyName: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/suppliers?companyName=${encodeURIComponent(companyName)}`, { responseType: 'text' })
      .pipe(
        catchError(err => {
          const message = err.error || 'An unexpected error occurred.';
          // console.log(message); // Show the backend message
          return throwError(() => new Error(message)); // Propagate the error if needed
        })
      );
  }

  getSuppliersByIds(ids: number[]): Observable<{ companyName: string; telephone: string }[]> {
    return this.http.get<{ companyName: string; telephone: string }[]>(
      `${this.baseUrl}/suppliers/multiple?ids=${ids.join(',')}`
    );
  }
  

  getPaginatedSuppliers(page: number, pageSize: number): Observable<SupplierDto[]> {
    return this.http.get<SupplierDto[]>(`${this.baseUrl}/suppliers/page?page=${page}&pageSize=${pageSize}`);
  }
  

  getDropdownSuppliers(page: number, pageSize: number): Observable<SupplierDropdownDto[]> {
    return this.http.get<SupplierDropdownDto[]>(`${this.baseUrl}/suppliers/dropdown?page=${page}&pageSize=${pageSize}`);
  }
  
}
