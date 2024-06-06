import { Component, Inject, OnInit } from '@angular/core';
import { patientDetailsDialogData } from '../physio-dashboard.component';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, CdkTextareaAutosize],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: patientDetailsDialogData
  )
  {}

  get formatedPhoneNumber(): string {
    if (this.data.selectedPatient.phoneNumber) {
      const areaCode = this.data.selectedPatient.phoneNumber.slice(0, 2);
      const firstPart = this.data.selectedPatient.phoneNumber.slice(2, 7);
      const secondPart = this.data.selectedPatient.phoneNumber.slice(7);

      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return "";
  }

  anamnesisForm: FormGroup = this.fb.group({
    gender: [""],
    profession: [""],
    weight: [""],
    height: [""],
    chiefComplaint: [""],
    pastMedicalHistory: [""],
    currentMedications: [""],
    observation: [""]
  })

  sendAnamnesis(): void {
    console.log("Send");
  }
}
