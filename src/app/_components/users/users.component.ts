import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {OperationsService} from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  apiResponse:any = [];
  subscription: Subscription;
  constructor(    private operation:OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService
    ) { 
      this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
        if (status) {
          console.log(status);
        }
      });
    }

  ngOnInit(): void {

    this.getAllUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }
  getAllUsers(){
    this.loaderService.show();
    this.operation.getAllUsers().subscribe(success =>{
      console.log(success);
      this.loaderService.hide();
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

  onDeleteUser() {
    this.confirmationDialogService.show();
  }

}
