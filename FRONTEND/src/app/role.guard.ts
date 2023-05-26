// role.guard.ts
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecuritiesService } from './services/security.service';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {
  constructor(private securitiesService: SecuritiesService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      // obtener el rol esperado de los datos de la ruta
      const expectedRoles = next.data['expectedRoles'];

      // obtener el role_id actual del usuario desde el servicio SecuritiesService
      const actualRole = this.securitiesService.getRole();

      // verificar si el role_id actual coincide con el rol esperado
      return expectedRoles.includes(actualRole);
    }
}
