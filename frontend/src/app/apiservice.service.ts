import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }
  
  //connecting frontend to backend
  url = "http://localhost:3000/";

  getAlldata():Observable<any>{
    return this._http.get(`${this.url}`);
  }
  createData(data:any):Observable<any>{
    console.log(data);
    return this._http.post(`${this.url}`,data);
  }
}
