import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface SupplierDto {
  companyName: string;
  telephone: string;
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
          alert(message); // 👈🏽 Show the backend message
          return throwError(() => new Error(message)); // 👈🏽 Propagate the error if needed
        })
      );
  }
  // getSupplierPhone(companyName: string): Observable<string> {
  //   return this.http.get(`${this.baseUrl}/suppliers?companyName=${encodeURIComponent(companyName)}`, { responseType: 'text' });
  // }
  
}
