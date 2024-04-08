import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../../models/user-model';
import { BASE_URL } from '../../config/constants.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient: HttpClient) { }

  public createPatient(user: UserRequest): Observable<UserRequest> {
    return this.httpClient.post<any>(`${BASE_URL}/patients`, user)
  }
}
