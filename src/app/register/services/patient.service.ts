import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { PatientInterface, UserLoginRequest, UserRequest } from '../../models/user-model';
import { BASE_URL } from '../../config/constants.config';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  isBrowser: boolean;
  currentPatient?: PatientInterface;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  public createPatient(user: UserRequest): Observable<UserRequest> {
    return this.httpClient.post<any>(`${BASE_URL}/patients`, user)
  }

  public loginPatient(user: UserLoginRequest): Observable<UserLoginRequest> {
    return this.httpClient.post<any>(`${BASE_URL}/login`, user)
  }

  public getCurrentPatient(): void {
    if (!this.isBrowser) return undefined;

    let currentUserToken = localStorage.getItem("loginToken");

    if (currentUserToken) {
      let decodedToken = jwtDecode(currentUserToken);
      this.httpClient.get<PatientInterface>(`${BASE_URL}/patients/${decodedToken.sub}`)
        .subscribe(data => this.currentPatient = data)
      
      console.log(this.currentPatient);
    }
    else {
      return undefined;
    }
  }
}
