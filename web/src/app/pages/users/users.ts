import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersPage {
  private http = inject(HttpClient);

  getMe() {
    this.http.get('/api/users/me').subscribe((data) => {
      console.log(data);
    });
  }
}
