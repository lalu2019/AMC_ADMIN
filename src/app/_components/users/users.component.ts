import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import {OperationsService} from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  apiResponse:any = [];
  subscription: Subscription;
  userForm: FormGroup; 
  constructor(    private operation:OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
    ) { 
      this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
        if (status) {
          console.log(status);
        }
      });
    }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullname:['', Validators.required],
      mobilenumber: ['', Validators.required],
      email: ['', Validators.required],
      course:['', Validators.required],
      college: ['', Validators.required],
      address: ['', Validators.required]               
    });
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

  onEditUser(user) {
    this.userForm.patchValue({
      fullname: user.FullName,
      mobilenumber: user.Mobile,
      email: user.Email,
      course:user.Course,
      college: user.College,
      address: user.Address               
    });
  }

  onUpdateForm() {
    alert('User form');
  }

  onDeleteUser() {
    this.confirmationDialogService.show();
    // this.alertService.delete();
  }

}
