import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  private apiUrl = 'http://localhost:3000/submit';

  constructor(private http: HttpClient) { }

  postFormData(data : any, ){
    return this.http.post(this.apiUrl, data);
  }
}
