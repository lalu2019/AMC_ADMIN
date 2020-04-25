import { Component, OnInit } from '@angular/core';
import {OperationsService} from '../../_services/operations.service'


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  apiResponse:any = [];
  constructor(    private operation:OperationsService
    ) { }

  ngOnInit(): void {

    this.getAllUsers();
  }
  getAllUsers(){
    this.operation.getAllUsers().subscribe(success =>{
      console.log(success);
      this.apiResponse = success.map(e => {
        return {
          id: e.payload.doc.id,
          FullName: e.payload.doc.data()['FullName'],
          Mobile: e.payload.doc.data()['Mobile'],
          Address: e.payload.doc.data()['Address'],
          Email: e.payload.doc.data()['Email'],
          Course: e.payload.doc.data()['Course'],
          College: e.payload.doc.data()['College'],
          imageUrl: e.payload.doc.data()['imageUrl'],
        };
      })
      console.log(this.apiResponse);
    })
  }

}
