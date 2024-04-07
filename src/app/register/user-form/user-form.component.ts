import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input'
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';
import { User } from '../../models/user-model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DialogConnectionErrorComponent } from '../dialog-connection-error/dialog-connection-error.component';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatButton, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;
  currentUser = new User();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient
  ) 
  {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      phoneNumber: new FormControl("", [Validators.required, Validators.pattern("[12-99]{1}[0-9]{10}")]),
      birthDay: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      neighborhood: new FormControl(""),
      street: new FormControl(""),
      homeNumber: new FormControl(""),
      zipCode: new FormControl("", [Validators.minLength(8), Validators.maxLength(8)]),
    })
  }

  register(): void {
    const isFormValid = this.userForm.valid;
    
    if (!isFormValid) {
      this.userForm.markAllAsTouched();
      this.dialog.open(DialogErrorComponent);
    }
    else {
      this.http.post<any>("http://localhost:8080/api/v1/patients", this.currentUser).subscribe((res) => {
          if (res && res.result) {
            this.dialog.open(DialogSuccessComponent);
          } else {
            this.dialog.open(DialogConnectionErrorComponent);
          }
        },
        () => {
          this.dialog.open(DialogConnectionErrorComponent);
        }
      );
    }
  }
}
