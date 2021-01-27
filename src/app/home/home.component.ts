import { Document } from './../models/documentModel';
import { User } from './../models/userModel';
import { Component, OnInit } from '@angular/core';  
import { ApiService } from '../api.service';
import { Participant } from '../models/participantModel';

@Component({  
	selector: 'app-home',  
	templateUrl: './home.component.html',  
	styleUrls: ['./home.component.css']  
})  
export class HomeComponent implements OnInit {
  userHistory:User;
  userDocument:Document[];
  userParticipant:Participant[];
  
  constructor(private apiService: ApiService) { }
  
  
  ngOnInit() {
    this.userDocument = [];
    this.userParticipant= [];

    this.getUserOID();
    
  }
  
    getUserOID(){
      this.apiService.getOID().subscribe((data: User)=>{  
        this.userHistory = data;  
        console.log(this.userHistory);
        console.log(this.userHistory.oid);  
  
    })
  }

  // getDocumentByUser(){
  //   this.apiService.getUserDocument(this.userHistory.oid).subscribe((docs: Document)=>{  
  //     this.userDocument = docs;  
  //     console.log(this.userHistory);
  //     console.log(this.userHistory.oid);
  //   })

  // }


  // getParticipantById(){

  //   this.apiService.getUserParticipant().subscribe((participant: Participant)=>{  
  //     this.userParticipant = participant;  
  //     console.log(this.userHistory);
  //     console.log(this.userHistory.oid);

  //   })

  // }

}