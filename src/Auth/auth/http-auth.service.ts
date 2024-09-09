import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root',
})
export class HttpAuthService {
  private readonly apiUrl = 'https://your-api-url.com/api';  // Replace with your actual API URL

  constructor(private http: HttpClient, private credentialsService: CredentialsService) {}

  // Register user
  register(userData: any): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, userData);
  }

  // Login user
  login(credentials: { email: string; password: string }): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post<any>(url, credentials);
  }

  // Logout user
  logout(): void {
    this.credentialsService.clearToken(); // Remove the token on logout
  }

  // Save token after login (can be called after login success)
  setToken(token: string): void {
    this.credentialsService.setToken(token);
  }

  // Add an Authorization header to outgoing requests (example use case)
  private getAuthHeaders(): HttpHeaders {
    const token = this.credentialsService.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }
}
