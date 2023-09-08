import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampsService {

  // url="https://localhost:44379/api";
  url="https://localhost:44314/api";
  constructor(private http:HttpClient) { }

  
  getAllCamps(): Observable<any[]> {
    return this.http.get<any>(this.url + "/camp");
  }
  
  filterCamp(): Observable<any[]>{
    return this.http.get<any>(this.url+'/camp/filter')
  }
  getSearchCamps(data:any):Observable<any[]> {
    return this.http.get<any>(this.url + "/camp/search/"+ data.checkIn+"/" +data.checkOut +"/"+ data.capacity);
  }

  postCamp(data:any){
    return this.http.post(this.url + '/camp', data)
  }

//  editCamp(reimbursement: any) {
//     return this.http.put(this.url + '/edit', reimbursement)
//   }

  getCamp(id:any): Observable<any[]>{
    return this.http.get<any>(this.url+'/camp/'+id)
  }

  updateCamp(id:any, request:any): Observable<any[]>{
    return this.http.put<any>(this.url+'/camp/'+id, request)
  }

  deleteCamp(id:any): Observable<any[]>{
    return this.http.delete<any>(this.url+'/camp/'+id);
  }

  bookingCamp(data:any){
    return this.http.post(this.url + '/booking', data)
  }

  getBookingCamp(brn:any): Observable<any[]>{
    return this.http.get<any>(this.url+'/booking/'+brn)
  }

  deleteBooking(brn:any): Observable<any[]>{
    return this.http.delete<any>(this.url+'/booking/'+brn);
  }


  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

}
