import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = false;


  switchLoginMode(): void {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(authForm: NgForm): void {
    console.log('authForm: ', authForm.form.value);
  }
}
