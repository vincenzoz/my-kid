import {inject, Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable} from 'rxjs';
import {
  Communication,
  CommunicationsResponse,
  CreateSchoolCommunication,
  ModifyCommunication
} from '../models/school-models';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private http: HttpClient = inject(HttpClient);

  constructor() {
  }

  schoolCommunications(): Observable<CommunicationsResponse> {
    const url = environment.BACKEND_URL + "api/school/communications";
    return this.http.get<CommunicationsResponse>(url)
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
}
