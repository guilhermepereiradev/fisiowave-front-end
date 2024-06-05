import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { appointmentDetailsDialogData } from '../physio-dashboard.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-sessions-details',
  standalone: true,
  imports: [ CommonModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, CdkTextareaAutosize ],
  templateUrl: './sessions-details.component.html',
  styleUrl: './sessions-details.component.css'
})
export class SessionsDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: appointmentDetailsDialogData
  )
  {}

  get formatedPhoneNumber(): string {
    if (this.data.selectedAppointment.patient.phoneNumber) {
      const areaCode = this.data.selectedAppointment.patient.phoneNumber.slice(0, 2);
      const firstPart = this.data.selectedAppointment.patient.phoneNumber.slice(2, 7);
      const secondPart = this.data.selectedAppointment.patient.phoneNumber.slice(7);

      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return "";
  }
}
