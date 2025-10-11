import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {
  Communication,
  CommunicationsResponse,
  CreateSchoolCommunication,
  ModifyCommunication
} from '../models/school-models';
import {Section} from '../models/enums/current-section.enum';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  schoolCommunications(type: Section): Observable<CommunicationsResponse> {
    const url = environment.BACKEND_URL + "api/school/communications";
    const params = new HttpParams()
      .set('type', type);
    return this.http.get<CommunicationsResponse>(url, { params })
  }

  createSchoolCommunication(createSchoolCommunication: CreateSchoolCommunication): Observable<Communication> {
    console.log("createSchoolCommunication");
    console.table(createSchoolCommunication);
    const url = environment.BACKEND_URL + "api/school/communications";
    return this.http.post<Communication>(url, createSchoolCommunication)
  }

  modifyCommunication(id: number, communication: ModifyCommunication): Observable<Communication> {
    console.log("modifyCommunication");
    console.table(communication);
    const url = environment.BACKEND_URL + "api/school/communications/" + id;
    return this.http.put<Communication>(url, communication)
  }

  viewSchoolCommunication(id: number): Observable<Communication> {
    console.log("viewCommunication");
    const url = environment.BACKEND_URL + "api/school/communications/" + id;
    return this.http.get<Communication>(url)
  }

  deleteCommunication(id: number): Observable<Communication> {
    console.log("deleteCommunication");
    const url = environment.BACKEND_URL + "api/school/communications/" + id;
    return this.http.delete<Communication>(url)
  }
}
