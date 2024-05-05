import { Injectable } from '@angular/core';
import { UserLoginRequest } from '../../models/user-model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../config/constants.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(user: UserLoginRequest): Observable<UserLoginRequest> {
    return this.httpClient.post<any>(`${BASE_URL}/login`, user)
  }
}
