import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { appointmentData } from '../physio-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { AppointmentsService } from '../services/appointments.service';
import { AppointmentResponse } from '../../models/user-model';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestDialogComponent } from '../../register/request-dialog/request-dialog.component';

@Component({
  selector: 'app-sessions-details',
  standalone: true,
  imports: [ CommonModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, CdkTextareaAutosize, FormsModule, ReactiveFormsModule ],
  templateUrl: './sessions-details.component.html',
  styleUrl: './sessions-details.component.css'
})
export class SessionsDetailsComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public appointmentData: appointmentData,
    private appointmentService: AppointmentsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
  )
  {}

  appointment?: AppointmentResponse;
  mostrarBotaoEnviar: boolean = false;

  observationForm: FormGroup = this.fb.group({
    observation: ["", [Validators.required, Validators.minLength(1), Validators.maxLength(1000)]]
  })

  ngOnInit(): void {
    this.getAppointment();
  }

  get formatedPhoneNumber(): string {
    if (this.appointment?.patient.phoneNumber) {
      const areaCode = this.appointment.patient.phoneNumber.slice(0, 2);
      const firstPart = this.appointment.patient.phoneNumber.slice(2, 7);
      const secondPart = this.appointment.patient.phoneNumber.slice(7);

      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return "";
  }

  updateObservation() {
    let observation = this.observationForm.value.observation;
    if (observation == "") {
      this.dialog.open(RequestDialogComponent, {
        data: {
          message: "Observação deve ser preenchida."
        }
      })

      return;
    }

    this.appointmentService.updateObservation(this.appointmentData.id, observation).subscribe({
      next: (res) => {
        this.appointment = res;

        this.mostrarBotaoEnviar = this.appointment.observation == null;
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: "Observação atualizada com sucesso"
          }
        })
      },
      error: (res) => {
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: res.message
          }
        })
      }
    });
  }


  getAppointment() {
    this.appointmentService.getAppointmentById(this.appointmentData.id).subscribe({
      next: (res) => {
        this.appointment = res;

        if(this.appointment.observation !== 'null') {
          this.observationForm.get('observation')?.setValue(res.observation);
        }

        this.mostrarBotaoEnviar = this.appointment.observation == null;
      },
      error: (res) => {
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: res
          }
        })
      }
    });
  }
}
