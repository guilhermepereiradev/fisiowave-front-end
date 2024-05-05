import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserLoginRequest } from '../models/user-model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from '../register/request-dialog/request-dialog.component';
import { LoginService } from './services/login.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatButton, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  userForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]]
  })

  login(): void {
    let userData = this.userForm.value;
    let loginUser = new UserLoginRequest(userData.email, userData.password);
    
    this.loginService.login(loginUser).subscribe({
      next: (res: any) => {
        localStorage.setItem("loginToken", res.accessToken)
        let decodedToken = jwtDecode(res.accessToken)
        this.router.navigate(["dashboard/", decodedToken.sub]);
      },
      error: (res) => {
        const message = res.error.message ?? "Erro no servidor";

        this.dialog.open(RequestDialogComponent, {
          data: {
            message: message
          }
        });
      }
    });
  }
}
