import { Participant } from './../models/participantModel';
import { Document } from './../models/documentModel';
import { User } from './../models/userModel';
import { Component, OnInit } from '@angular/core';  
import { ApiService } from '../api.service';
import { concatMap} from 'rxjs/operators'

@Component({  
	selector: 'app-home',  
	templateUrl: './home.component.html',  
	styleUrls: ['./home.component.css']  
})  

export class HomeComponent implements OnInit {
  userHistory:User;
  userDocument:Document[];
  userDocumentList:Document;
  userParticipant:Participant;
  oid:string;
  participantName : string;
  fullName : any[];

  
  constructor(private apiService: ApiService) { }
  
  
  ngOnInit() {
    this.userDocument = []; // initilize 

    this.getUserData();

  }
  
    //Subscribes to user's OID
    getUserOID(){
      //Get user OID
      this.apiService.getOID().subscribe((data: User)=>{  
        this.userHistory = data;  
        this.oid=this.userHistory.oid;  
    })
  }

  //
  getUserData(){

    let userDoc : Document;

      //Calls getOID method and subscribes to user's data with that OID 
      this.apiService.getOID().subscribe((user) => {
        this.apiService.getUserDocument(user.oid).subscribe((Docs: Document[]) => {
          
          //Loop through each document and populate the properties in documentModel
          for(const doc of Docs){
            userDoc = new Document();

            userDoc.caseNumber = doc.caseNumber;
            userDoc.submittedDate = doc.submittedDate;
            userDoc.receiptCode = doc.receiptCode;
            userDoc.caseParticipant = doc.caseParticipant;
            userDoc.documentType = doc.documentType;
            userDoc.documentSubType = doc.documentSubType;

            //Uses documentType to pipe verbage based on the number type given 
            if (doc.documentType === 1) {
              if (doc.documentSubType === 1) {
                userDoc.documentName = "Income Employer Verfication ";
              }
              if (doc.documentSubType === 3) {
                userDoc.documentName = "Income Award Letter from Social Security Administration ";
              }
            }
            if (doc.documentType === 2) {
              userDoc.documentName = "Identity document ";
            }
            if (doc.documentType === 3) {
              userDoc.documentName = "Shelter document ";
            }
            if (doc.documentType === 4) {
              userDoc.documentName = "Combined Six Month report ";
            }


            //Subscribes to Participant name using the caseParticipant id,
            //If the caseParticipant is not null
            if (doc.caseParticipant !== null ) {

              this.apiService.getUserParticipant(doc.caseParticipant).pipe(
                concatMap(result => this.apiService.getUserParticipant(doc.caseParticipant)),
              ) .subscribe((respo : Participant) =>  {   

                //this.fullName = respo; 

                //console.log(JSON.stringify(this.fullName));
                
                userDoc.participantName = "for " + respo.firstName + " " + respo.lastName; 

                console.log(userDoc.participantName);
              });

            } else {
              //Leave empty if caseParticipant is null 
              userDoc.participantName = "";
            }
            //Pushes userDoc into userDocument array, used in HTML 
            this.userDocument.push(userDoc);
          }
        
        });
  });

  }

}