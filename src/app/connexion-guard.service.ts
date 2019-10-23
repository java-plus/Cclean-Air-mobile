import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthentificationService} from './services/authentification.service';
import {catchError, map} from 'rxjs/operators';

/**
 * Classe gérant la protection des url en fonction de l'authentification.
 */
@Injectable({
    providedIn: 'root'
})
export class ConnexionGuard implements CanActivateChild {

    constructor(private router: Router, private authentificationService: AuthentificationService) {
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> |
        Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authentificationService.verificationEstAuthentifie()
            .pipe(map(() => true),
                catchError(() => of(this.router.parseUrl('/authentification'))));
    }
}
