import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {AuthResponseData} from "../../interfaces/authResponseData";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  showSpinner: boolean = false;

  constructor(private authService: AuthService) {}

  switchLoginMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm): void {
    if(!authForm.valid) return;
    this.showSpinner = true;
    const email: string = authForm.value.email;
    const password: string = authForm.value.password;
    let authObs: Observable<AuthResponseData>;


    if(this.isLoginMode) {
      authObs = this.authService.signIn(email, password);
    }else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: response => {
        console.log(response);
        this.showSpinner = false;
        authForm.resetForm();
      },
      error: error => {
        alert(error);
        this.showSpinner = false;
      }
    });
  }

}
