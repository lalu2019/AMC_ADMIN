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
  createStoryForm: FormGroup;

  isSubmitted: boolean = false;
  input = document.getElementById('input')

  apiResponse:any = [];
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
      link: ['', Validators.required],
      source : ['Vimeo', Validators.required],                
    });

    this.createTaskForm = this.formBuilder.group({
      title:['', Validators.required],
      description: ['', Validators.required],
      link: ['', ],             
    });
    this.createStoryForm = this.formBuilder.group({
      title:['', Validators.required],
      description: ['', Validators.required],
      link: ['', ], 
      storyPicture: ['', ],             
    });
    

    
    
    this.addFirebaseToken();
    this.getAllStory();


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
  let record = {};
  record['title'] = this.createClassForm.value.title
  record['description'] = this.createClassForm.value.description
  record['link'] = this.createClassForm.value.link
  record['status'] = "Active";
  record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();

   this.operation.createVideo(record).then(success =>{
    console.log(success);
    this.createClassForm.reset();
  })
 }

 addNewTask(){
  let record = {};
  record['title'] = this.createTaskForm.value.title
  record['description'] = this.createTaskForm.value.description
  record['link'] = this.createTaskForm.value.link
  record['status'] = "Active";
  record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();

   this.operation.createTask(record).then(success =>{
    console.log(success);
    this.createTaskForm.reset();
  })
 }
 createNewStory(){
  let record = {};
  record['title'] = this.createStoryForm.value.title
  record['description'] = this.createStoryForm.value.description
  record['link'] = this.createStoryForm.value.link
  record['status'] = "Active";
  record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
   this.operation.createStory(record).then(success =>{
    console.log(success);
    this.createStoryForm.reset();
    this.getAllStory();
  })
}
  getAllStory() {
    this.operation.getAllTasks().subscribe(success =>{
      console.log(success);
      this.apiResponse = success.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          description: e.payload.doc.data()['description'],
          status: e.payload.doc.data()['status'],
          link: e.payload.doc.data()['link'],
          createdDate: e.payload.doc.data()['createdDate']
        };
      })
      console.log(this.apiResponse);
    })
  }

  deleteStory(value){

    this.operation.deleteStory(value.id).then(success =>{
      console.log(success);
      this.getAllStory();
     
    })
  }

 

}
