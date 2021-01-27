import { Participant } from './models/participantModel';
import { User } from './models/userModel';
import { Injectable } from '@angular/core';  
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({  
	providedIn: 'root'  
})  
export class ApiService {

  private API_URL_USER = "https://sdtcodingchallenge.azurewebsites.net/api/GetUser";
  private API_URL_USER_DOC = "https://sdtcodingchallenge.azurewebsites.net/api/GetSubmittedDocumentByUser?id=";
  private API_URL_USER_PARTICIPANT = "https://sdtcodingchallenge.azurewebsites.net/api/GetParticipantById?id=";


  constructor(private http: HttpClient) { }
  

	public getOID(): Observable<any>{  
    return this.http.get(this.API_URL_USER);
    
  }  
  
  public getUserDocument(oid : string) : Observable<any>{  
		return this.http.get(this.API_URL_USER_DOC + oid);  
  }  
  
  public getUserParticipant(participant : string) : Observable<any>{  
		return this.http.get(this.API_URL_USER_PARTICIPANT + participant);  
	}  
}