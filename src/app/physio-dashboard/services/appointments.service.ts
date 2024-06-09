import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppointmentResponse } from '../../models/user-model';
import { BASE_URL } from '../../config/constants.config';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(    
    private httpClient: HttpClient,
  ) { }

  getAppointmentById(id: string): Observable<AppointmentResponse> {
    return this.httpClient.get<AppointmentResponse>(`${BASE_URL}/appointments/${id}`);   
  }

  updateObservation(id: string, observation: string): Observable<AppointmentResponse> {
    const params = new HttpParams().set('observation', observation);
    return this.httpClient.put<AppointmentResponse>(`${BASE_URL}/appointments/${id}`, null, { params: params });   
  }
}
