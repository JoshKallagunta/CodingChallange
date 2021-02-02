import { Participant } from './../models/participantModel';
import { Document } from './../models/documentModel';
import { User } from './../models/userModel';
import { Component, OnInit } from '@angular/core';  
import { ApiService } from '../api.service';

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

  
  constructor(private apiService: ApiService) { }
  
  
  ngOnInit() {
    this.userDocument = [];

    this.getUserData();

  }
  
    getUserOID(){
      this.apiService.getOID().subscribe((data: User)=>{  
        this.userHistory = data;  
        this.oid=this.userHistory.oid;  
    })
  }

  getUserData(){

    let userDoc : Document;


      this.apiService.getOID().subscribe((user) => {
        this.apiService.getUserDocument(user.oid).subscribe((Docs: Document[]) => {
          for(const doc of Docs){
            userDoc = new Document();

            userDoc.caseNumber = doc.caseNumber;
            userDoc.submittedDate = doc.submittedDate;
            userDoc.receiptCode = doc.receiptCode;
            userDoc.caseParticipant = doc.caseParticipant;
            userDoc.documentType = doc.documentType;
            userDoc.documentSubType = doc.documentSubType;
            //userDoc.documentName = "test document";

            //
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


            //
            if (doc.caseParticipant !== null ) {
              this.apiService.getUserParticipant(doc.caseParticipant).subscribe((name : Participant) => {
              userDoc.participantName = "for " + name.firstName + " " + name.lastName;

              //console.log(userDoc.participantName);
            });
            } else {
              userDoc.participantName = "";
            }

            this.userDocument.push(userDoc);
          }
        
        });
  });

    
  }

}