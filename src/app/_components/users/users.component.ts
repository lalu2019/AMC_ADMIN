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
  selectedUser: any;
  srName:any = '';
  srMobile:any = '';
  membershipType:any = '';
  TotalUser: any = 0;


  constructor(private operation: OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        
        console.log(this.selectedUser.id);
        this.operation.deleteUsers(this.selectedUser.id).then(success =>{
          this.getAllUser();
        })
        
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
      membership: ['', Validators.required],
      uuid:[''],
      assingedCourseCat:['', Validators.required]
    });
    this.permissionUserForm = this.formBuilder.group({
      id: [''],
      video: [false],
      task: [false],
      test: [false]
    });
    this.getAllUser();

    if(localStorage.getItem("Totaluser")){
      this.TotalUser =  JSON.parse(localStorage.getItem("Totaluser"));
    }
    

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

  userFilter(srName, srMobile, membershipType){
     this.getAllUser();
  }
  ResetFilter(){
    this.srName = '';
    this.srMobile = '';
    this.membershipType ='';
    this.getAllUser();
  }
  fetrchDataWithoutFilter(){
    this.loaderService.show();
      this.operation.getUserWithouFilter().subscribe(success => {
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
            fullcourse:e.payload.doc.data()['fullcourse'],
            uuid:e.payload.doc.data()['uuid'],
            model:e.payload.doc.data()['model'],
            assingedCourseCat:e.payload.doc.data()['assingedCourseCat'],
            batch:e.payload.doc.data()['batch']
          
          };
        })
        this.TotalUser = this.apiResponse.length;
      })
    
  }
  getAllUser() {
    this.loaderService.show();
    if(!this.srName && !this.srMobile &&  !this.membershipType) {
      this.fetrchDataWithoutFilter();
    }else{
      this.operation.getAllUsers(this.srName, this.srMobile,  this.membershipType).then(success => {
        console.log(success);
        this.loaderService.hide();
        this.apiResponse = success.map(e => {
          return {
            id: e.id,
            FullName: e.data()['FullName'],
            Mobile: e.data()['Mobile'],
            Address: e.data()['Address'],
            Email: e.data()['Email'],
            Course: e.data()['Course'],
            College: e.data()['College'],
            imageUrl: e.data()['imageUrl'],
            userType: e.data()['userType'],
            status: e.data()['status'],
            courseEndDate: e.data()['course_end_date'],
            course:e.data()['course'],
            test:e.data()['test'],
            task:e.data()['task'],
            democoursee:e.data()['democoursee'],
            fullcourse:e.data()['fullcourse'],
            uuid:e.data()['uuid'],
            model:e.data()['model'],
            assingedCourseCat:e.data()['assingedCourseCat'],
            batch:e.data()['batch']
          
          };
        })
        console.log(this.apiResponse);
      })
    }
   
  }

  onEditUser(user) {
    this.updateUserForm.patchValue({
      id: user.id,
      usertype: user.userType,
      status: user.status || 'Active',
      courseEndDate: user.courseEndDate,
      uuid:user.uuid,
      batch: user.batch,
      membership: user.membership || '',
      assingedCourseCat: user.assingedCourseCat
    });
  }

  onUpdateForm() {
    let record = {};
    record['userType'] = this.updateUserForm.value.usertype;
    record['status'] = this.updateUserForm.value.status;
    record['course_end_date'] = this.updateUserForm.value.courseEndDate;
    record['batch'] = this.updateUserForm.value.batch;
    record['membership'] = this.updateUserForm.value.membership;
    record['uuid'] = this.updateUserForm.value.uuid;
    record['assingedCourseCat'] = this.updateUserForm.value.assingedCourseCat;
    
    this.loaderService.show();
    this.operation.updateUsers(this.updateUserForm.value.id, record).then(success => {
      this.loaderService.hide();
      this.alertService.update();
      this.getAllUser();
    })
  }

  onDeleteUser(value) {
    this.selectedUser = value;
    this.confirmationDialogService.show();

    // this.alertService.delete();
  }
  openUserProfile(user){

      this.selectedUser = user

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
      this.getAllUser();
    })
  }

}
