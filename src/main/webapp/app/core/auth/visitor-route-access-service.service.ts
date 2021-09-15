import { Injectable, isDevMode } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'app/core/auth/account.service';
import { StateStorageService } from './state-storage.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class VisitorRouteAccessService implements CanActivate {
  constructor(private router: Router, private accountService: AccountService, private stateStorageService: StateStorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.identity().pipe(
      map(account => {
        if (isDevMode()) {
          // eslint-disable-next-line no-console
          console.log('Anyone can');
        }

        return true;
        if (account) {
          const authorities = route.data['authorities'];

          if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
            return true;
          }

          if (isDevMode()) {
            console.error('User has not any of required authorities: ', authorities);
          }
          this.router.navigate(['accessdenied']);
          return false;
        }

        this.stateStorageService.storeUrl(state.url);
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
