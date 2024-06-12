import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnamnesisModel, PatientResponse, PatientResumeResponse, UserLoginRequest, UserRequest } from '../../models/user-model';
import { BASE_URL } from '../../config/constants.config';
import { Observable } from 'rxjs';

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

  public gelAllPatients(): Observable<PatientResumeResponse[]> {
    return this.httpClient.get<PatientResumeResponse[]>(`${BASE_URL}/patients`)   
  }

  public sendAnamnesis(id: string, anamnesis: AnamnesisModel): Observable<PatientResponse> {
    return this.httpClient.put<PatientResponse>(`${BASE_URL}/patients/${id}/anamnesis`, anamnesis);
  }
}
