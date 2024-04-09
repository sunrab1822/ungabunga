import { HttpClient } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  ApiUrl = "https://viewpoint.jedlik.cloud/api"


  getLocations() : Observable<any[]>{
    return this.http.get<any[]>(this.ApiUrl + '/locations');
  }

  getViewpoints(locationName: string) : Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}/locations/${locationName}/viewpoints`);
  }

  getAllViewpoints() : Observable<any[]> {
    return this.http.get<any[]>(`${this.ApiUrl}/viewpoints`);
  }

  sendRating(modle: any) : Observable<any> {
    return this.http.post<any>(this.ApiUrl+'/rate', modle)
  }
}
