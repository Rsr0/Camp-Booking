import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(

    route: ActivatedRouteSnapshot,

    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   

   if (this.isLoggedIn()) {      

    return true;      

  }

  else

  {

    this.router.navigate(['']);

    alert("Access Denied. Only For Admin")

  }      

return false;



  }

  public isLoggedIn(): boolean {      

    let status = false;      

    if (localStorage.getItem('isLoggedIn') == "true") {      

       status = true;      

    }

      else {      

       status = false;      

       }      

    return status;      

  }
}    