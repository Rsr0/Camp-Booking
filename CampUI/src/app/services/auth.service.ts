import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  // constructor() { }
  // private user: User;
  // isAuthorized() {
  //     return !!this.user;
  // }
  // hasRole(role: Role) {
  //     return this.isAuthorized() && this.user.Role === role;
  // }
  // login(role: Role) {
  //   this.user = { role: role };
  // }
  // logout() {
  //   this.user = null;
  // }




  isLogin = false;

  roleAs: any;

  constructor() { }

  login(value: string) {
    this.isLogin = true;
    this.roleAs = value;
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', this.roleAs);
    return of({ success: this.isLogin, role: this.roleAs });
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
}
