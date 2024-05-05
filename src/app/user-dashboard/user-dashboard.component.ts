import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../register/services/patient.service';
import { PatientResponse, UserRequest } from '../models/user-model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  currentPatient?: PatientResponse

  constructor(
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute
  )
  {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params[ "id" ];

    this.patientService.getPatientById(id).subscribe(
      {
        next: (res) => {
          this.currentPatient = res;
        }
      }
    );
  }
}
