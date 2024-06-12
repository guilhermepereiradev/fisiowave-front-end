import { Component, Inject, OnInit } from '@angular/core';
import { patientDetailsDialogData } from '../physio-dashboard.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSelectModule } from '@angular/material/select';
import { AnamnesisModel, PatientResponse } from '../../models/user-model';
import { PatientService } from '../../register/services/patient.service';
import { RequestDialogComponent } from '../../register/request-dialog/request-dialog.component';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatDialogModule, MatIconModule, MatInputModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, CdkTextareaAutosize],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: patientDetailsDialogData,
    private dialog: MatDialog,
    private patientService: PatientService
  )
  {}

  mostrarBotaoEnviar: boolean = false;
  patient?: PatientResponse;

  ngOnInit(): void {
    this.getPatient();
  }

  get formatedPhoneNumber(): string {
    if (this.patient?.phoneNumber) {
      const areaCode = this.patient?.phoneNumber.slice(0, 2);
      const firstPart = this.patient?.phoneNumber.slice(2, 7);
      const secondPart = this.patient?.phoneNumber.slice(7);

      return `(${areaCode}) ${firstPart}-${secondPart}`;
    }

    return "";
  }

  anamnesisForm: FormGroup = this.fb.group({
    gender: ["", Validators.required],
    profession: ["", Validators.required],
    weight: ["", Validators.required],
    height: ["", Validators.required],
    chiefComplaint: ["", Validators.required],
    pastMedicalHistory: ["", Validators.required],
    currentMedications: ["", Validators.required],
    observation: ["", Validators.required]
  })

  updateAnamnesis(): void {
    if(!this.anamnesisForm.valid) {
      this.dialog.open(RequestDialogComponent, {
        data: {
          message: "Preencha todos os campos corretamente"
        }
      })
      return; 
    }

    let anamnesisData = this.anamnesisForm.value;
    let anamnesis = new AnamnesisModel(anamnesisData.gender, anamnesisData.profession, anamnesisData.weight, anamnesisData.height, anamnesisData.chiefComplaint, anamnesisData.pastMedicalHistory, anamnesisData.pastMedicalHistory, anamnesisData.observation);
    this.patientService.sendAnamnesis(this.data.id, anamnesis).subscribe({
      next: (res) => {
        this.patient = res;

        this.mostrarBotaoEnviar = false;
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: "Avaliação cadastrada com sucesso."
          }
        })
      },
      error: (res) =>{
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: res.message
          }
        })
      }
    });
  }

  getPatient(): void {
    this.patientService.getPatientById(this.data.id).subscribe({
      next: (res) => {
        this.patient = res;

        let anamnesis: any = this.patient.anamnesis;
        this.mostrarBotaoEnviar = true;  

        if (anamnesis !== undefined) {
          const fields = ['gender', 'profession', 'weight', 'height', 'chiefComplaint', 'pastMedicalHistory', 'currentMedications', 'observation'];
        
          fields.forEach(field => {
              this.anamnesisForm.get(field)?.setValue(anamnesis[field]);
          });

          this.mostrarBotaoEnviar = false;
        }
      },
      error: (res) =>{
        this.dialog.open(RequestDialogComponent, {
          data: {
            message: res.message
          }
        })
      }
    });
  }

}
