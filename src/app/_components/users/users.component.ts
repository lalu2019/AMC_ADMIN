import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OperationsService } from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  apiResponse: any = [];
  subscription: Subscription;
  updateUserForm: FormGroup;
  constructor(private operation: OperationsService,
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
    this.updateUserForm = this.formBuilder.group({
      id: [''],
      usertype: ['', Validators.required],
      status: ['', Validators.required],
      courseEndDate: ['']
    });
    this.getAllUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }
  getAllUsers() {
    this.loaderService.show();
    this.operation.getAllUsers().subscribe(success => {
      console.log(success);
      this.loaderService.hide();
      debugger;
      this.apiResponse = success.map(e => {
        debugger;
        return {
          id: e.payload.doc.id,
          FullName: e.payload.doc.data()['FullName'],
          Mobile: e.payload.doc.data()['Mobile'],
          Address: e.payload.doc.data()['Address'],
          Email: e.payload.doc.data()['Email'],
          Course: e.payload.doc.data()['Course'],
          College: e.payload.doc.data()['College'],
          imageUrl: e.payload.doc.data()['imageUrl'],
          userType: e.payload.doc.data()['userType'],
          status: e.payload.doc.data()['status'],
          courseEndDate: e.payload.doc.data()['course_end_date'],
        };
      })
      console.log(this.apiResponse);
    })
  }

  onEditUser(user) {
    debugger;
    this.updateUserForm.patchValue({
      id: user.id,
      usertype: user.userType,
      status: user.status,
      courseEndDate: user.courseEndDate
    });
  }

  onUpdateForm() {
    let record = {};
    record['userType'] = this.updateUserForm.value.usertype;
    record['status'] = this.updateUserForm.value.status;
    record['course_end_date'] = this.updateUserForm.value.courseEndDate;
    this.loaderService.show();
    this.operation.updateUsers(this.updateUserForm.value.id, record).then(success => {
      this.loaderService.hide();
      this.alertService.update();
      this.getAllUsers();
    })
  }

  onDeleteUser() {
    this.confirmationDialogService.show();
    // this.alertService.delete();
  }

}
