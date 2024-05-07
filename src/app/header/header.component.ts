import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { PatientService } from '../register/services/patient.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, RouterModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private patientService: PatientService
  )
  {}

  logout() {
    if (localStorage.getItem('loginToken')) localStorage.removeItem('loginToken');
    this.router.navigate(['/']);
  }

  hasLoginToken(): boolean {
    return localStorage.getItem('loginToken') !== null;
  }
}
