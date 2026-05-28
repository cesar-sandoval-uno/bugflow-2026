import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NotificationService } from '../../core/services/notification.service/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);
  const router = inject(Router);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Unexpected error occurred';

      if (error.status === 401) {
        auth.logout({ logoutParams: {returnTo: window.location.origin } });
        router.navigate(['/']);
      } else if (error.error?.message) {
        message = error.error.message;
      } else if (error.status === 0) {
        message = 'Network error';
      } else if (error.status >= 500) {
        message = 'Server error';
      }

      if (error.status !== 401) {
        console.error('[HTTP ERROR]', error);
        notification.show(message, 'error');
      }

      return throwError(() => new Error(message));
    })
  );
};
