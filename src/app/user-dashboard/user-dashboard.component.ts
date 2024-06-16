import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PatientService } from '../register/services/patient.service';
import { PatientResponse, Physiotherapist, PhysiotherapistResponse, AppointmentRequest, UserRequest, AppointmentsResumeResponse } from '../models/user-model';
import { ActivatedRoute } from '@angular/router';
import { PhysiotherapistsService } from './services/physiotherapists.service';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RequestDialogComponent } from '../register/request-dialog/request-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, ReactiveFormsModule, MatDatepickerModule, MatInput, MatButtonModule,
    MatTableModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  providers: [DatePipe]
})
export class UserDashboardComponent implements OnInit {
  currentPatient?: PatientResponse
  allPhysiotherapists?: Physiotherapist[];
  allAvailableTimes: string[] = [];
  loading = false;

  appointmentForm: FormGroup = this.fb.group({
    date: ["", Validators.required],
    patientId: ["", Validators.required],
    physiotherapistId: ["", Validators.required],
    time: ["", Validators.required]
  })

  get formatedPhoneNumber(): string {
    if (this.currentPatient?.phoneNumber) {
      const areaCode = this.currentPatient.phoneNumber.slice(0, 2);
      const firstPart = this.currentPatient.phoneNumber.slice(2, 7);
      const secondPart = this.currentPatient.phoneNumber.slice(7);

      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return "";
  }

  get appointments(): AppointmentsResumeResponse[] {
    return this.currentPatient?.appointments ?? [];
  }

  appointmentsColumns: string[] = ['time', 'physiotherapist'];

  constructor(
    private patientService: PatientService,
    private activatedRoute: ActivatedRoute,
    private physiotherapistsService: PhysiotherapistsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private datePipe: DatePipe,
  ) { }

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective | undefined;

  ngOnInit(): void {
    this.updateCurrentPatient();

    this.physiotherapistsService.getPhysiotherapists().subscribe(
      {
        next: (res) => {
          this.allPhysiotherapists = res;
        }
      }
    )

    this.appointmentForm.valueChanges.subscribe(() => {
      let appointmentData = this.appointmentForm.value;
      this.allAvailableTimes = [];

      if (appointmentData.physiotherapistId && appointmentData.date) this.updateAvailableTimes()
    });
  }

  updateAvailableTimes(): void {
    let appointmentData = this.appointmentForm.value;

    this.physiotherapistsService.getAvailableTime(appointmentData.physiotherapistId, this.formatTimeRequestDate(appointmentData.date)).subscribe({
      next: (res) => {
        this.allAvailableTimes = res;
      },
      error: (res) => {
        const message = res.error.message ?? "Erro no servidor";

        this.dialog.open(RequestDialogComponent, {
          data: {
            message: message
          }
        })
      }
    })
  }

  bookAppointment(): void {
    if (!this.currentPatient) return;
    
    this.loading = true;

    let appointmentData = this.appointmentForm.value;
    let appointmentDate = new Date(appointmentData.time);

    let newAppointment = new AppointmentRequest(appointmentDate, this.currentPatient.id, appointmentData.physiotherapistId);

    this.physiotherapistsService.createAppointment(newAppointment).subscribe({
      next: () => {
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: "Sessão marcada com sucesso!"
          }
        });

        this.appointmentForm.reset();
        if(this.formGroupDirective) this.formGroupDirective.resetForm();
        this.updateCurrentPatient();
        this.loading = false;
      },
      error: (res) => {
        const message = res.error.message ?? "Erro no servidor";

        this.dialog.open(RequestDialogComponent, {
          data: {
            message: message
          }
        });
      }
    });
  }

  updateCurrentPatient(): void {
    let id = this.activatedRoute.snapshot.params["id"];

    this.patientService.getPatientById(id).subscribe(
      {
        next: (res) => {
          this.currentPatient = res;
        }
      }
    );
  }

  formatTimeRequestDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  
  formatTime(dateString: string): string {
    const date = new Date(dateString);

    return this.datePipe.transform(date, 'HH:mm') || '';
  }
}
