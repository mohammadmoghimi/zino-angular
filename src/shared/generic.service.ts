import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';  
@Injectable({
  providedIn: 'root'
})
export class GenericService {


  constructor(private http: HttpClient) { }

  // Generic GET request
  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(url, { params });
  }

  // Generic POST request
  post<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, body, { headers });
  }

  // Generic PUT request
  put<T>(url: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(url, body, { headers });
  }

  // Generic DELETE request
  delete<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(url, { params });
  }}
