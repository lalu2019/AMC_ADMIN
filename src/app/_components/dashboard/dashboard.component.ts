import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OperationsService } from '../../_services/operations.service'
import readXlsxFile from 'read-excel-file'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sendNotificationForm: FormGroup;
  // createClassForm: FormGroup; 
  createTaskForm: FormGroup;
  createUserForm: FormGroup;
  createStoryForm: FormGroup;
  createBook: FormGroup;

  subscription: Subscription;


  isSubmitted: boolean = false;
  input = document.getElementById('input')

  apiResponse: any = [];
  BookList: any = [];
  UploadedFileContent: any = [];
  enquiryList: any = [];
  userListData: any = [];
  activeUsers: number = 1;
  freeUsers: number = 2;
  paidUsers: number = 0;
  inactiveUsers: number = 1;

  deleteStoryId: any
  TotalUser: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private operation: OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService
  ) {
    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        this.loaderService.show();
        this.operation.deleteStory(this.deleteStoryId).then(success => {
          console.log(success);
          this.loaderService.hide();
          this.alertService.delete();
          // this.getAllStory();
        })
      }
    });
  }

  get sendNotificationFormValidate() { return this.sendNotificationForm.controls; }

  ngOnInit(): void {

    this.sendNotificationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // topic: ['', Validators.required]
    });


    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      link: ['',],
    });

    this.getAllUsers();
    //this.addFirebaseToken();
    this.enquiry();
    //this.insertInquery();
    //Excel file upload code...

    const that = this;
    // document.getElementById("fileImport").onchange= function(e: Event) {
    //   let file = (<HTMLInputElement>e.target).files[0];
    //   console.log(file);
    //   readXlsxFile(file).then((rows) => {
    //     console.log(rows);
    //     // `rows` is an array of rows
    //     // each row being an array of cells.
    //      that.UploadedFileContent = rows;
    //      for(let i=0;i<that.UploadedFileContent.length; i ++){
    //       that.insertCat(that.UploadedFileContent[i][0], that.UploadedFileContent[i][1]);
    //      }

    //   })
    //  }

  }

  addNewNotifications(){

    this.operation.sendPushNotification(this.sendNotificationForm.value.title, this.sendNotificationForm.value.description, '') 
    this.alertService.save();
    this.sendNotificationForm.reset();
  }

  enquiry() {
    this.loaderService.show();
    this.operation.getInquiry().subscribe(success => {
      console.log(success);
      this.loaderService.hide();
      this.enquiryList = success.map(e => {
        return {
          id: e.payload.doc.id,
          FullName: e.payload.doc.data()['FullName'],
          Email: e.payload.doc.data()['Email'],
          Mobile: e.payload.doc.data()['Mobile'],
          EnquiryType: e.payload.doc.data()['EnquiryType'],
          Description: e.payload.doc.data()['Description'],
          createdDate: e.payload.doc.data()['createdDate'],
          status:e.payload.doc.data()['status'] || 'Pending'

        };
      })
      console.log(this.enquiryList);
    })
  }

  MarkAsDone(value){
    let record = {};
    record["status"] = "Done";  
    this.operation.updateEnquiery(value.id, record).then(success => {
      console.log(success);
      this.enquiry();
    })


  }
  insertInquery() {

    let record = {};
    record["FullName"] = "Unknown User";  //Get from user profile, Pass static for test
    record["Email"] = "mapparena@gmail.com";    //Get from user profile, Pass static for test
    record["Mobile"] = "7048351338";
    record["EnquiryType"] = "Membership";  //Static
    record["Description"] = " description";   //User Will enter 
    record["createdDate"] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

    this.operation.AddInquery(record).then(success => {
      console.log(success);
    })
  }
  async insertCat(col1, col2) {

    let record = {};
    record['Title'] = col1;
    record['iconName'] = col2;
    this.operation.addCategories(record).then(success => {
      console.log(success);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.sendNotificationForm.invalid) {
      return;
    }
  }

  addFirebaseToken() {
    let record = {};
    record['token'] = localStorage.getItem("firebaseTkn");
    record['Name'] = "Admin";
    record['Source'] = "Admin Panel";
    this.operation.addToken(record).then(success => {
      console.log(success);
    })
  }

  getAllUsers() {
    this.operation.getUserWithouFilter().subscribe(success => {
      this.userListData = success.map(e => {
        if (e.payload.doc.data()['status'] == 'Active') {
          this.activeUsers += 1;
        }
        if (e.payload.doc.data()['status'] == 'InActive') {
          this.inactiveUsers += 1;
        }
        if (e.payload.doc.data()['userType'] == 'Free') {
          this.freeUsers += 1;
        }
        if (e.payload.doc.data()['userType'] == 'Paid') {
          this.paidUsers += 1;
        }
        this.TotalUser += 1

        return {
          id: e.payload.doc.id,
          FullName: e.payload.doc.data()['FullName'],
          Mobile: e.payload.doc.data()['Mobile'],
          Address: e.payload.doc.data()['Address'],
          Email: e.payload.doc.data()['Email'],
          Course:  e.payload.doc.data()['Course'],
          College:  e.payload.doc.data()['College'],
          imageUrl:  e.payload.doc.data()['imageUrl'],
          userType:  e.payload.doc.data()['userType'],
          status:  e.payload.doc.data()['status'],
          courseEndDate:  e.payload.doc.data()['course_end_date'],
          uuid: e.payload.doc.data()['uuid'],
          model: e.payload.doc.data()['model']
        
        };
      })

      localStorage.setItem("Totaluser", JSON.stringify(this.TotalUser));
     console.log( this.userListData);
      
    })
  }

  //  addNewClass(){
  //   let record = {};
  //   record['title'] = this.createClassForm.value.title
  //   record['description'] = this.createClassForm.value.description
  //   record['link'] = this.createClassForm.value.link
  //   record['status'] = "Active";
  //   record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();

  //    this.operation.createVideo(record).then(success =>{
  //     console.log(success);
  //     this.createClassForm.reset();
  //   })
  //  }

  addNewTask() {
    let record = {};
    record['title'] = this.createTaskForm.value.title
    record['description'] = this.createTaskForm.value.description
    record['link'] = this.createTaskForm.value.link
    record['status'] = "Pending";
    record['endDate'] = this.createTaskForm.value.endDate;
    record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

    this.operation.createTask(record).then(success => {
      console.log(success);
      this.createTaskForm.reset();
    })
  }

}
