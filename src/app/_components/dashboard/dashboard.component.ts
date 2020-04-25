import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import {OperationsService} from '../../_services/operations.service'
import readXlsxFile from 'read-excel-file'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sendNotificationForm: FormGroup; 
  createClassForm: FormGroup; 
  createTaskForm: FormGroup; 
  createUserForm: FormGroup; 

  isSubmitted: boolean = false;
  input = document.getElementById('input')

  constructor(
    private formBuilder: FormBuilder,
    private operation:OperationsService
  ) { }

  get sendNotificationFormValidate() { return this.sendNotificationForm.controls; }

  ngOnInit(): void {
    this.sendNotificationForm = this.formBuilder.group({
      messageText:['', Validators.required],
      messageLabel: ['', Validators.required],
      topic: ['', Validators.required]                  
    });

    this.createClassForm = this.formBuilder.group({
      title:['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required]                  
    });

    

    this.addFirebaseToken();


    document.getElementById("fileImport").onchange= function(e: Event) {
      let file = (<HTMLInputElement>e.target).files[0];
      console.log(file);
      readXlsxFile(file).then((rows) => {
        console.log(rows);
        // `rows` is an array of rows
        // each row being an array of cells.
      })
     }

     

  }

  onSubmit() {
    this.isSubmitted = true; 
    if (this.sendNotificationForm.invalid) {
        return;
    }
 }

 addFirebaseToken(){
  let record = {};
   record['token'] = localStorage.getItem("firebaseTkn");
   record['Name'] = "Admin";
   record['Source'] = "Admin Panel";

   this.operation.addToken(record).then(success =>{
     console.log(success);
   })
 }

 addNewClass(){
   console.log(this.createClassForm)
  let record = {};
  record['title'] = 'title';
  record['description'] = "description";
  record['link'] ="link";
  record['status'] = "Active";

   this.operation.createVideo(record).then(success =>{
    console.log(success);
  })
 }

 

}
