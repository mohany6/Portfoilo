import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  private activeRequests = 0;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;

    // Add common headers
    const modifiedRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        
        // Handle different error types
        let errorMessage = 'An unexpected error occurred';
        
        if (error.error?.message) {
          errorMessage = error.error.message;
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect to server';
        } else if (error.status >= 400 && error.status < 500) {
          errorMessage = 'Client error occurred';
        } else if (error.status >= 500) {
          errorMessage = 'Server error occurred';
        }

        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this.activeRequests--;
      })
    );
  }

  get isLoading(): boolean {
    return this.activeRequests > 0;
  }
}
