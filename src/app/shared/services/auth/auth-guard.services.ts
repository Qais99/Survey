import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { usersServices } from "../users.services";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService:usersServices, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
                
                let bool : boolean = this.authService.isAuthenticated()
                if(bool){
                    return true
                }else{
                    this.router.navigate(['/login']);
                }
                return false
            
  }
}