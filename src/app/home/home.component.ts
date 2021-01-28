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
  //docList:Document[];
  userParticipant:Participant;
  oid:string;
  participantName : string;
  
  constructor(private apiService: ApiService) { }
  
  
  ngOnInit() {
    this.userDocument = [];

    this.getUserOID();

  }
  
    getUserOID(){
      this.apiService.getOID().subscribe((data: User)=>{  
        this.userHistory = data;  
        this.oid=this.userHistory.oid;

        this.getDocumentByUser(this.oid); 
  
    })
  }

  getDocumentByUser(oid:string){
    this.apiService.getUserDocument(this.oid).subscribe((docs: Document[])=>{  

      let userDoc : Document;

      if (docs !== undefined) {
        for (const doc of docs) {
          userDoc = new Document();
  
          userDoc.caseNumber = doc.caseNumber;
          userDoc.submittedDate = doc.submittedDate;
          userDoc.receiptCode = doc.receiptCode;
          userDoc.caseParticipant = doc.caseParticipant;
          userDoc.documentType = doc.documentType;
          userDoc.documentSubType = doc.documentSubType;

          if (doc.caseParticipant !== null) {

            //let name = this.getParticipantById(doc.caseParticipant);

            this.getParticipantById(doc.caseParticipant);

            userDoc.participantName = this.participantName;

            //console.log("1" + this.participantName);

        
          } else {
            userDoc.participantName = "hh ";
          }
          this.userDocument.push(userDoc);
          //console.log(this.userDocument);
  
        }
      }
    })

  }

 
  getParticipantById(caseParticipant:number) {

    this.apiService.getUserParticipant(caseParticipant).subscribe((participant: Participant)=>{  
      this.userParticipant = participant;

      //name = this.userParticipant.firstName + " " + this.userParticipant.lastName;
      this.participantName = this.userParticipant.firstName + " " + this.userParticipant.lastName;

      //console.log("2" + this.participantName);

    });
    //return this.participantName;


  }

}