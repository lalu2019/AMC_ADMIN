import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import {OperationsService} from '../../_services/operations.service'
import readXlsxFile from 'read-excel-file'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit {

  createStoryForm: FormGroup;
  createBook: FormGroup;
  membershipForm: FormGroup;
  contacUsForm: FormGroup;

  isActiveButton:any = 'btn1'

  apiResponse:any = [];
  BookList:any = [];
  membershipList:any = [];
  contactUslList:any = [];

  constructor(
    private formBuilder: FormBuilder,
    private operation:OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService
  ) { }


    setActive(buttonName){
      this.isActiveButton = buttonName;
    }
    isActive = function (buttonName){
      return this.isActiveButton === buttonName;
    }


  ngOnInit(): void {
    this.getAllStory();
    this.getAllBooks();

    this.createStoryForm = this.formBuilder.group({
      title:['', Validators.required],
      description: ['', Validators.required],
      link: ['', ], 
      storyPicture: ['', ],             
    });
    this.createBook = this.formBuilder.group({
      title:['', Validators.required],
      imageUrl:['', Validators.required],
      description: [''],
      link: ['', Validators.required], 
    });
    this.contacUsForm = this.formBuilder.group({
      title:['', Validators.required],
      Name:['', Validators.required],
      Email: [''],
      Mobile: [''], 
    });
    
  }

  createBookSave(){
    let record = {};
    record['title'] = this.createBook.value.title
    record['description'] = this.createBook.value.description
    record['link'] = this.createBook.value.link
    record['imageUrl'] = this.createBook.value.imageUrl
    
    record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
     this.operation.AddNewBook(record).then(success =>{
      console.log(success);
      this.createBook.reset();
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
      this.loaderService.show();  
      this.operation.getAllStory().subscribe(success =>{
        console.log(success);
        this.loaderService.hide();
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
      this.confirmationDialogService.show();
     // this.deleteStoryId = value.id;
    }
  
    getAllBooks() {
      this.loaderService.show();  
      this.operation.getAllBooks().subscribe(success =>{
        console.log(success);
        this.loaderService.hide();
        this.BookList = success.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            description: e.payload.doc.data()['description'],
            imageUrl: e.payload.doc.data()['imageUrl'],
            link: e.payload.doc.data()['link'],
            createdDate: e.payload.doc.data()['createdDate']
          };
        })
        console.log(this.BookList);
      })
    }
  
    deleteBook(value){
          this.loaderService.show();  
          this.operation.deleteBook(value.id).then(success =>{
            console.log(success);
            this.loaderService.hide();  
            this.alertService.delete();
            this.getAllBooks();
      })
    }

  // Contact Us Section 
  AddCntact(){
    let record = {};
    record['title'] = this.contacUsForm.value.title
    record['Name'] = this.contacUsForm.value.Name
    record['Mobile'] = this.contacUsForm.value.Mobile
    record['Email'] = this.contacUsForm.value.Email
    record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
     this.operation.newConatc(record).then(success =>{
      console.log(success);
      this.contacUsForm.reset();
      this.getContact();
    })
  }
    getContact() {
      this.loaderService.show();  
      this.operation.getAllContact().subscribe(success =>{
        console.log(success);
        this.loaderService.hide();
        this.contactUslList = success.map(e => {
          return {
            id: e.payload.doc.id,
            title: e.payload.doc.data()['title'],
            Name: e.payload.doc.data()['Name'],
             Mobile: e.payload.doc.data()['Mobile'],
            Email: e.payload.doc.data()['Email'],
            createdDate: e.payload.doc.data()['createdDate']
          };
        })
        console.log(this.contactUslList);
      })
    }
  
    deleteContact(value){
      this.confirmationDialogService.show();
     // this.deleteStoryId = value.id;
    }

}
