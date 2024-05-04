import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../register/services/patient.service';
import { UserRequest } from '../models/user-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private patientService: PatientService
  )
  {}

  ngOnInit(): void {
    this.patientService.getCurrentPatient();
  }
}
