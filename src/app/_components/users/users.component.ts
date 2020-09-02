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
  permissionUserForm: FormGroup;
  modulePermission:any = [
    {name:"Course Section", ischecked:true},
    {name:"Demo Course", ischecked:true},
    {name:"Full Course", ischecked:true},
    {name:"Tests Section", ischecked:true},
    {name:"Task", ischecked:false},
    {name:"Notes", ischecked:false}
  ]


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
      courseEndDate: [''],
      batch: ['', Validators.required],
      membership: ['', Validators.required]
    });
    this.permissionUserForm = this.formBuilder.group({
      id: [''],
      video: [false],
      task: [false],
      test: [false]
    });
    this.getAllUsers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }

  checkboxValueChange(event: any, permission: any) {
    if (permission.ischecked) {
      permission.ischecked = false;
    } else {
      permission.ischecked = true;
    }
  }
  getAllUsers() {
    this.loaderService.show();
    this.operation.getAllUsers().subscribe(success => {
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
          userType: e.payload.doc.data()['userType'],
          status: e.payload.doc.data()['status'],
          courseEndDate: e.payload.doc.data()['course_end_date'],
          course:e.payload.doc.data()['course'],
          test:e.payload.doc.data()['test'],
          task:e.payload.doc.data()['task'],
          democoursee:e.payload.doc.data()['democoursee'],
          fullcourse:e.payload.doc.data()['fullcourse']
        
        };
      })
      console.log(this.apiResponse);
    })
  }

  onEditUser(user) {
    this.updateUserForm.patchValue({
      id: user.id,
      usertype: user.userType,
      status: user.status,
      courseEndDate: user.courseEndDate,
      batch: 'A',
      membership: 'Gold'
    });
  }

  onUpdateForm() {
    let record = {};
    record['userType'] = this.updateUserForm.value.usertype;
    record['status'] = this.updateUserForm.value.status;
    record['course_end_date'] = this.updateUserForm.value.courseEndDate;
    record['batch'] = this.updateUserForm.value.batch;
    record['membership'] = this.updateUserForm.value.membership;
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

  onEditPermissionUser(user) {

    for(let i=0; i < this.modulePermission.length; i++){
      console.log()
      if(this.modulePermission[i].name == 'Course Section'){
       this.modulePermission[i].ischecked = user.course
      }
      if(this.modulePermission[i].name == 'Tests Section'){
        this.modulePermission[i].ischecked = user.test
      }
      if(this.modulePermission[i].name == 'Task'){
        this.modulePermission[i].ischecked = user.task
      }
      if(this.modulePermission[i].name == 'Demo Course'){
        this.modulePermission[i].ischecked = user.democoursee
      }
      if(this.modulePermission[i].name == 'Full Course'){
        this.modulePermission[i].ischecked = user.fullcourse
      }
    }


    this.permissionUserForm.patchValue({
      id: user.id,
      // video: user.videoModulePermission,
      // task: user.taskModulePermission,
      // test: user.testModulePermission
    });
  }

  onSavePermissionForm() {
    console.log(this.modulePermission)
      let permissions = {
          course:true,
          test:true,
          task:true,
          democoursee:true,
          fullcourse:true,
          notes:false,
      }
      for(let i=0; i < this.modulePermission.length; i++){
        console.log()
        if(this.modulePermission[i].name == 'Course Section'){
          permissions.course = this.modulePermission[i].ischecked
        }
        if(this.modulePermission[i].name == 'Tests Section'){
          permissions.test = this.modulePermission[i].ischecked
        }
        if(this.modulePermission[i].name == 'Task'){
          permissions.task = this.modulePermission[i].ischecked
        }
        if(this.modulePermission[i].name == 'Demo Course'){
          permissions.democoursee = this.modulePermission[i].ischecked
        }
        if(this.modulePermission[i].name == 'Full Course'){
          permissions.fullcourse = this.modulePermission[i].ischecked
        }
        if(this.modulePermission[i].name == 'notes'){
          permissions.notes = this.modulePermission[i].ischecked
        }
      }
      console.log(permissions);
    // let record = {};
    // record['course'] = permissions.test;
    // record['democoursee'] = permissions.test;
    // record['fullcourse'] = this.permissionUserForm.value.courseEndDate;
    // record['task'] = this.permissionUserForm.value.usertype;
    // record['test'] = permissions.test;

    this.loaderService.show();
    this.operation.updateUsers(this.permissionUserForm.value.id, permissions).then(success => {
      this.loaderService.hide();
      this.alertService.update();
      this.getAllUsers();
    })
  }

}
