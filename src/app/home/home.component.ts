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

  //docList:Document[];
  userParticipant:Participant;
  oid:string;
  participantName : string;
  userDocumentName:Document[];

  
  constructor(private apiService: ApiService) { }
  
  
  ngOnInit() {
    this.userDocument = [];

    //this.getUserOID();
    this.getUserData();

  }
  
    getUserOID(){
      this.apiService.getOID().subscribe((data: User)=>{  
        this.userHistory = data;  
        this.oid=this.userHistory.oid;

        //this.getDocumentByUser(this.oid); 
  
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


            if (doc.caseParticipant !== null ) {
              this.apiService.getUserParticipant(doc.caseParticipant).subscribe((name : Participant) => {
              userDoc.participantName = name.firstName;
            });
            } else {
              userDoc.participantName = " ";
            }



            this.userDocument.push(userDoc);
          }
        
        });
  });

    

  }

  // getDocumentByUser(oid:string){
  //   this.apiService.getUserDocument(this.oid).subscribe((docs: Document[])=>{  

  //     let userDoc : Document;

  //     if (docs !== undefined) {
  //       for (const doc of docs) {
  //         userDoc = new Document();
  
  //         userDoc.caseNumber = doc.caseNumber;
  //         userDoc.submittedDate = doc.submittedDate;
  //         userDoc.receiptCode = doc.receiptCode;
  //         userDoc.caseParticipant = doc.caseParticipant;
  //         userDoc.documentType = doc.documentType;
  //         userDoc.documentSubType = doc.documentSubType;

  //         //
  //         if (doc.documentType === 1) {
  //           if (doc.documentSubType === 1) {
  //             userDoc.documentName = "Income Employer Verfication ";
  //           }
  //           if (doc.documentSubType === 3) {
  //             userDoc.documentName = "Income Award Letter from Social Security Administration ";
  //           }
  //         }
  //         if (doc.documentType === 2) {
  //           userDoc.documentName = "Identity document ";
  //         }
  //         if (doc.documentType === 3) {
  //           userDoc.documentName = "Shelter document ";
  //         }
  //         if (doc.documentType === 4) {
  //           userDoc.documentName = "Combined Six Month report ";
  //         }


  //         //
  //         if (doc.caseParticipant !== null) {

  //           //let name = this.getParticipantById(doc.caseParticipant);

  //           //this.getParticipantById(doc.caseParticipant);


  //            this.apiService.getUserParticipant(doc.caseParticipant).subscribe((name : Participant) => {
  //             userDoc.participantName = name.firstName + " " + name.lastName;
              

  //             console.log("before " + name.firstName); 


  //           });


  //           //userDoc.participantName = this.participantName;

  //           //console.log("1" + this.participantName);

        
  //         } else {
  //           userDoc.participantName = " ";
  //         }
  //         this.userDocument.push(userDoc);
  //         //console.log(this.userDocument);
  
  //       }
  //     }
  //   })

  // }

 
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