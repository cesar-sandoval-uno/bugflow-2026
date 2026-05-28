import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@bugflow-2026/shared-types';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  private http = inject(HttpClient);
  private me$ = this.getMe();
  me = toSignal(this.me$, { initialValue: null });

  getAssignableUsers() {
    return this.http.get<User[]>('/api/users/assignable');
  }

  getMe() {
    return this.http.get<User>('/api/users/me');
  }
}
