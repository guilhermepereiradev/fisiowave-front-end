import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { PatientResponse, UserLoginRequest, UserRequest } from '../../models/user-model';
import { BASE_URL } from '../../config/constants.config';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  currentPatient?: PatientResponse;

  constructor(
    private httpClient: HttpClient,
  ) {}

  public createPatient(user: UserRequest): Observable<UserRequest> {
    return this.httpClient.post<any>(`${BASE_URL}/patients`, user)
  }

  public getPatientById(id: string): Observable<PatientResponse> {
    return this.httpClient.get<PatientResponse>(`${BASE_URL}/patients/${id}`)   
  }
}
