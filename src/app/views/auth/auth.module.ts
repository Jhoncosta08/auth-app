import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {AuthComponent} from "./auth.component";
import {SpinnerModule} from "../../shared/spinner/spinner.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SpinnerModule,
    FormsModule
  ]
})
export class AuthModule { }
