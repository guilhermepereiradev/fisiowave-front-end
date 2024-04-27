import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog'
import { RequestDialogComponent } from '../request-dialog/request-dialog.component';
import { AddressRequest, City, CityIdRequest, UserRequest } from '../../models/user-model';
import { PatientService } from '../services/patient.service';
import { CityService } from '../services/city.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatButton, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit{;

  constructor(
    private dialog: MatDialog,
    private patientService: PatientService,
    private cityService: CityService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  cities?: City[];
  citiesNameList?: string[] = [];

  ngOnInit(): void {
    this.cityService.getAllCities().subscribe({
      next: (res) => this.cities = res
    })

    this.cities?.map(city => this.citiesNameList?.push(city.name));
  }


  userForm: FormGroup = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    phoneNumber: ["", [Validators.required, Validators.pattern("[12-99]{1}[0-9]{10}")]],
    birthDate: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required]],

    zipCode: ["", [Validators.minLength(8), Validators.maxLength(8)]],
    street: [""],
    number: [""],
    complement: [""],
    neighborhood: [""],
    state: [""],
    city: [""],
  })

  register(): void {
    const isFormValid = this.userForm.valid;
    
    if (!isFormValid) {
      this.userForm.markAllAsTouched();
      this.dialog.open(RequestDialogComponent, {
        data: {
          message: "Preencha todos os campos obrigatórios corretamente"
        }
      });
    } else {    
      let userData = this.userForm.value;
      
      let newUser = new UserRequest(userData.name, userData.phoneNumber, userData.birthDate, userData.email);
      newUser.address = new AddressRequest(userData.zipCode, userData.street, userData.number, userData.neighborhood, userData.complement, new CityIdRequest(userData.city))


      this.patientService.createPatient(newUser).subscribe({
        next: () => {
          this.router.navigateByUrl("/dashboard");
          this.dialog.open(RequestDialogComponent, {
            data: {
              message: "Usuário registrado com sucesso!"
            }
          });
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
  }
}
