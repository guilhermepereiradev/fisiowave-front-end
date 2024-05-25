import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/constants.config';
import { Observable } from 'rxjs';
import { Physiotherapist, AppointmentRequest } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class PhysiotherapistsService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  public getPhysiotherapists(): Observable<Physiotherapist[]> {
    return this.httpClient.get<Physiotherapist[]>(`${BASE_URL}/physiotherapists`)   
  }

  public getAvailableTime(id: string, date: string): Observable<string[]> {
    return this.httpClient.get<string[]>(`${BASE_URL}/physiotherapists/${id}`, { params: { 'availableOn': date } });
  }

  public createAppointment(appointment: AppointmentRequest): Observable<AppointmentRequest> {
    return this.httpClient.post<any>(`${BASE_URL}/appointments`, appointment)
  }
}
