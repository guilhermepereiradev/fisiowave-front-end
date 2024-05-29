import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { AppointmentResponse, PatientResumeResponse, PhysiotherapistResponse } from '../models/user-model';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PatientService } from '../register/services/patient.service';
import { PhysiotherapistsService } from '../user-dashboard/services/physiotherapists.service';

@Component({
  selector: 'app-physio-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTableModule, MatCardModule, MatSelectModule, MatButtonModule],
  templateUrl: './physio-dashboard.component.html',
  styleUrl: './physio-dashboard.component.css'
})
export class PhysioDashboardComponent implements OnInit {

  physio?: PhysiotherapistResponse;
  appointments: AppointmentResponse[] = new Array;
  patients: PatientResumeResponse[] = new Array;

  appointmentsColumns: string[] = ['time', 'patientName', 'patientPhone', 'patientEmail', 'view'];

  patientsColumns: string[] = ['name', 'phoneNumber', 'birthDate', 'email', 'view'];

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.params["id"];
    this.getPhysio(id);
    this.getAppointments(id);
    this.getPatientes();
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private physiotherapistsService: PhysiotherapistsService,
    private patientService: PatientService
  ) { }


  getPhysio(id: string): void {
    this.physiotherapistsService.getById(id).subscribe({
      next: (res) => {
        this.physio = res;
      },
      error: () => {

      }
    });
  }

  getAppointments(id: string): void {
    this.physiotherapistsService.getAppointmentsById(id).subscribe({
      next: (res) => {
        this.appointments = res;
      },
      error: () => {

      }
    });
  }

  getPatientes(): void {
    this.patientService.gelAllPatients().subscribe({
      next: (res) => {
        this.patients = res;
        console.log(this.patients)
      },
      error: () => {

      }
    });
  }
}
