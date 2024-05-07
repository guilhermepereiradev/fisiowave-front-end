import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../register/services/patient.service';
import { PatientResponse, UserRequest } from '../models/user-model';
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

  get formatedPhoneNumber(): string {
    if (this.currentPatient?.phoneNumber) {
      const areaCode = this.currentPatient.phoneNumber.slice(0, 2);
      const firstPart = this.currentPatient.phoneNumber.slice(2, 7);
      const secondPart = this.currentPatient.phoneNumber.slice(7);
  
      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return "";
  }

  constructor(
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute
  ) {}

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
