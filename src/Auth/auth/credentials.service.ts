import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CredentialsService {
  private readonly tokenKey = 'authToken';

  constructor() {}

  // Save token to localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Delete token from localStorage (for logout)
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Check if the user is authenticated by checking if the token exists
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
