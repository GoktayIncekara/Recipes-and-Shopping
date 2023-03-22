import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = "";
  authForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<AuthResponseData>; 

    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email,password);
    } else {
      authObservable = this.authService.signup(email,password)
    }

    authObservable.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(["/recipes"]);
    }, errorRes => {
      this.error = errorRes.message;
      this.isLoading = false;
    });

    this.authForm.reset();
  }

  onHandleError() {
    this.error = "";
  }
}
