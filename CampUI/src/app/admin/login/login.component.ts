import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('')
  })
  Alert = false;

  userName = "admin@camp.com";
  password = "Admin@123";
  isAdmin=false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


  GetFormValues() {

    // console.log(this.LoginForm.value);
    const data = this.LoginForm.value;
    if (data.Email == this.userName && data.Password == this.password) {
      localStorage.setItem('isLoggedIn', "true");
      localStorage.setItem('token', data.Password);
      this.isAdmin=true;
      this.router.navigate(['/admin/dashboard']);
      
    }
    else {
      this.Alert = true;
    }

  }

  CloseAlert() {
    this.Alert = false;
  }

  get Email() {
    return this.LoginForm.get('Email');
  }
  get Password() {
    return this.LoginForm.get('Password');
  }
}
