import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecuritiesService } from './services/security.service';

@Injectable()
export class authGuard implements CanActivate {

  constructor(private securitiesService: SecuritiesService, private router: Router) { }

  canActivate(): boolean {
    const token = this.securitiesService.getToken();

    if (!token) {
      // Redirigir al login si no hay token
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
