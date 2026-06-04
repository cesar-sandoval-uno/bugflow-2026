import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { API_CONFIG } from 'data-access/src/lib/api-config.token';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersPage {
  private http = inject(HttpClient);
  private config = inject(API_CONFIG);
  private baseUrl = `${this.config.baseUrl}/users`;

  getMe() {
    this.http.get(`${this.baseUrl}/me`).subscribe((data) => {
      console.log(data);
    });
  }
}
