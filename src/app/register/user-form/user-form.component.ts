import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input'
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatButton],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      phoneNumber: new FormControl("", [Validators.required]),
      birthDay: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      neighborhood: new FormControl(""),
      street: new FormControl(""),
      homeNumber: new FormControl(""),
      zipCode: new FormControl(""),
    })
  }
}
