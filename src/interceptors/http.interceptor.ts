import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  // Optional: You can inject services like Router, AuthService, etc.
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Step 1: Clone the request and add the token to the headers (if available)
    const token = this.getToken();  // Replace this with your token logic

    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // Add token to Authorization header
        }
      });
    }

    // Step 2: Handle the request and add error handling
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle the error based on the status code
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }

        // Log the error message (You could display a notification to the user here)
        console.error(errorMessage);

        // Optionally, you could handle different status codes here:
        // For example, redirect to login page for 401 (Unauthorized)
        if (error.status === 401) {
          // Add redirection logic or call a logout function
          console.warn('Unauthorized - possibly redirect to login');
        }

        // Return the error
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  // Example function to get the token
  private getToken(): string | null {
    // Replace this with your actual token retrieval logic
    return localStorage.getItem('authToken');
  }
}
