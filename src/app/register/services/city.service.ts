import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../../config/constants.config';
import { Observable } from 'rxjs';
import { City } from '../../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  public getAllCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(`${BASE_URL}/cities`);
  }
}
