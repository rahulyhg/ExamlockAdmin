import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isLoggedIn       // {1}
            .take(1)                               // {2} 
            .map((isLoggedIn: boolean) => {        // {3}
                if (!isLoggedIn) {

                    console.log('authguard');
                    this.router.navigate(['/login']);  // {4}
                    return false;
                }
                return true;
            });
    }
}
