import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({  
	providedIn: 'root'  
})  
export class ApiService {

  constructor(private http: HttpClient) { }
  

	public getOID(): Observable<any>{  
    return this.http.get(environment.API_URL_USER);
  }  
  
  public getUserDocument(oid : string) : Observable<any> {  
		return this.http.get(environment.API_URL_USER_DOC + oid);  
  }  
  
  public getUserParticipant(participantId : number) : Observable<any>{  
		return this.http.get(environment.API_URL_USER_PARTICIPANT + participantId);  
	}  
}