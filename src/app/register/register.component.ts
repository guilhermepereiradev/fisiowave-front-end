import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCard, MatCardContent, MatCardTitle, MatCardHeader, UserFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
