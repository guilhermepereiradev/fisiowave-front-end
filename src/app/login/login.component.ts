import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatButton, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {;

  constructor(
    private fb: FormBuilder
  ) {}

  userForm: FormGroup = this.fb.group({
    email: ["", [Validators.required, Validators.minLength(3)]],
    password: ["", [Validators.required]]
  })

  login(): void {
  }
}
