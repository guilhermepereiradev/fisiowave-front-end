import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatCardModule, UserFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
