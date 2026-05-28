import { Component, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ButtonComponent } from '../../shared/ui/button/button';
import { LogoComponent } from '../../shared/ui/logo/logo';

@Component({
  selector: 'app-public',
  imports: [ButtonComponent, LogoComponent],
  templateUrl: './public.html',
  styleUrl: './public.scss',
})
export class PublicPage {
  private auth = inject(AuthService);

  login() {
    this.auth.loginWithRedirect({
      appState: { target: '/dashboard' },
    });
  }
}
