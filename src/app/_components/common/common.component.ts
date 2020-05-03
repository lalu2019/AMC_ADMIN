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
  tipsForm: FormGroup;
  contacUsForm: FormGroup;

  isActiveButton:any = 'btn1'

  apiResponse:any = [];
  BookList:any = [];
  membershipList:any = [];
  contactUslList:any = [];
  tipsList:any = [];
  selectedRecordForEdit:any = {};


  subscription: Subscription;
  deleteRcordId: any;
  deleteRecordType:any;
  constructor(
    private formBuilder: FormBuilder,
    private operation:OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService
  ) { 

    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        
        if(this.deleteRecordType == 'books'){
          this.loaderService.show();
          this.operation.deleteBook(this.deleteRcordId).then(success => {
            console.log(success);
            this.loaderService.hide();
            this.alertService.delete();
            this.getAllBooks();
  
          })
        }
        if(this.deleteRecordType == 'story'){
          this.loaderService.show();
          this.operation.deleteStory(this.deleteRcordId).then(success => {
            console.log(success);
            this.loaderService.hide();
            this.alertService.delete();
            this.getAllStory();
  
          })
        }
        if(this.deleteRecordType == 'contacts'){
          this.loaderService.show();
          this.operation.DeleteContact(this.deleteRcordId).then(success => {
            console.log(success);
            this.loaderService.hide();
            this.alertService.delete();
             this.getContact();
  
          })
        }
        if(this.deleteRecordType == 'membership'){
          this.loaderService.show();
          this.operation.deleteMembership(this.deleteRcordId).then(success => {
            console.log(success);
            this.loaderService.hide();
            this.alertService.delete();
             this.getMemberships();
  
          })
        }
        if(this.deleteRecordType == 'tips'){
          this.loaderService.show();
          this.operation.deleteTips(this.deleteRcordId).then(success => {
            console.log(success);
            this.loaderService.hide();
            this.alertService.delete();
             this.getTips();
  
          })
        }
        
     
      }
    });
  }


    setActive(buttonName){
      this.isActiveButton = buttonName;
    }
    isActive = function (buttonName){
      return this.isActiveButton === buttonName;
    }


  ngOnInit(): void {
    this.getAllStory();
    this.getAllBooks();
    this.getContact();
    this.getMemberships();
    this.getTips();

    this.createStoryForm = this.formBuilder.group({
      id: [''],
      title:['', Validators.required],
      description: ['', Validators.required],
      link: ['', ], 
      storyPicture: ['', ],             
    });
    this.createBook = this.formBuilder.group({
      id: [''],
      title:['', Validators.required],
      imageUrl:[''],
      description: [''],
      link: ['', Validators.required], 
    });

    this.contacUsForm = this.formBuilder.group({
      id: [''],
      title:['', Validators.required],
      Name:['', Validators.required],
      Email: [''],
      Mobile: [''], 
    });
    this.tipsForm = this.formBuilder.group({
      id: [''],
      title:['', Validators.required],
      description: [''],
      picture: [''],
      Reference: [''], 
    });

    this.membershipForm = this.formBuilder.group({
      id:[''],
      title:['', Validators.required],
      description: [''],
      actual_amount: ['', Validators.required],
      offer_amout: [''],
      offer_end: [''],
      offer_terms: ['']
    });

  }

  editTips(selected){
    debugger;
    this.tipsForm.controls.id.setValue(selected.id)
    this.tipsForm.controls.title.setValue(selected.title)
    this.tipsForm.controls.description.setValue(selected.description)
    this.tipsForm.controls.picture.setValue(selected.picture)
    this.tipsForm.controls.Reference.setValue(selected.Reference)
  }
  updateTips(){
    let record = {};
    record['title'] = this.tipsForm.value.title
    record['description'] = this.tipsForm.value.description
    record['picture'] = this.tipsForm.value.picture
    record['Reference'] = this.tipsForm.value.Reference
    this.loaderService.show(); 
     this.operation.updateTips( this.tipsForm.value.id, record).then(success =>{
      this.loaderService.hide(); 
      this.alertService.update();
      this.tipsForm.reset();
      this.getTips();
    })
  }

  addTips(){

    let record = {};
    record['title'] = this.tipsForm.value.title
    record['description'] = this.tipsForm.value.description
    record['picture'] = this.tipsForm.value.picture
    record['Reference'] = this.tipsForm.value.Reference
    record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    this.loaderService.show(); 
     this.operation.addTips(record).then(success =>{
      this.loaderService.hide(); 
      this.alertService.save();
      this.tipsForm.reset();
      this.getTips();
    })
  }
  getTips(){
    this.loaderService.show();  
    this.operation.getTips().subscribe(success =>{
      console.log(success);
      this.loaderService.hide();
      this.tipsList = success.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          description: e.payload.doc.data()['description'],
          picture: e.payload.doc.data()['picture'],
          Reference: e.payload.doc.data()['Reference'],
          createdDate: e.payload.doc.data()['createdDate']

        };
      })
      console.log(this.tipsList);
    })
  }

  editMembership(selected){
    this.membershipForm.controls.id.setValue(selected.id)
    this.membershipForm.controls.title.setValue(selected.title)
    this.membershipForm.controls.description.setValue(selected.description)
    this.membershipForm.controls.actual_amount.setValue(selected.actual_amount)
    this.membershipForm.controls.offer_amout.setValue(selected.offer_amout)
    this.membershipForm.controls.offer_end.setValue(selected.offer_end)
    this.membershipForm.controls.offer_terms.setValue(selected.offer_terms)
  }
  updateMembership(){
    let record = {};
    record['title'] = this.membershipForm.value.title
    record['description'] = this.membershipForm.value.description
    record['actual_amount'] = this.membershipForm.value.actual_amount
    record['offer_amout'] = this.membershipForm.value.offer_amout
    record['offer_end'] = this.membershipForm.value.offer_end
    record['offer_terms'] = this.membershipForm.value.offer_terms
    this.loaderService.show(); 
     this.operation.updateMembership( this.membershipForm.value.id, record).then(success =>{
      this.loaderService.hide(); 
      this.alertService.update();
      this.membershipForm.reset();
      this.getMemberships();
    })
  }

  addMembership(){

    let record = {};
    record['title'] = this.membershipForm.value.title
    record['description'] = this.membershipForm.value.description
    record['actual_amount'] = this.membershipForm.value.actual_amount
    record['offer_amout'] = this.membershipForm.value.offer_amout
    record['offer_end'] = this.membershipForm.value.offer_end
    record['offer_terms'] = this.membershipForm.value.offer_terms
    record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    this.loaderService.show(); 
     this.operation.addMembership(record).then(success =>{
      this.loaderService.hide(); 
      this.alertService.save();
      this.membershipForm.reset();
      this.getMemberships();
    })
  }
  getMemberships(){

    this.loaderService.show();  
    this.operation.getMembership().subscribe(success =>{
      console.log(success);
      this.loaderService.hide();
      this.membershipList = success.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          description: e.payload.doc.data()['description'],
          actual_amount: e.payload.doc.data()['actual_amount'],
          offer_amout: e.payload.doc.data()['offer_amout'],

          offer_end: e.payload.doc.data()['offer_end'],
          offer_terms: e.payload.doc.data()['offer_terms'],
          createdDate: e.payload.doc.data()['createdDate']

        };
      })
      console.log(this.membershipList);
    })

  }

  editBooks(selected){
    debugger;
    this.createBook.controls.id.setValue(selected.id)
    this.createBook.controls.title.setValue(selected.title)
    this.createBook.controls.description.setValue(selected.description)
    this.createBook.controls.imageUrl.setValue(selected.imageUrl)
    this.createBook.controls.link.setValue(selected.link)
  }
  updateBooks(){
    let record = {};
    record['title'] = this.createBook.value.title
    record['description'] = this.createBook.value.description
    record['imageUrl'] = this.createBook.value.imageUrl
    record['link'] = this.createBook.value.link
    this.loaderService.show(); 
     this.operation.updateBook( this.createBook.value.id, record).then(success =>{
      this.loaderService.hide(); 
      this.alertService.update();
      this.createBook.reset();
      this.getAllBooks();
    })
  }

  createBookSave(){
    let record = {};
    record['title'] = this.createBook.value.title
    record['description'] = this.createBook.value.description
    record['link'] = this.createBook.value.link
    record['imageUrl'] = this.createBook.value.imageUrl
    
    record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    this.loaderService.show(); 
     this.operation.AddNewBook(record).then(success =>{
      console.log(success);
      this.loaderService.hide(); 
      this.alertService.save();
      this.createBook.reset();
      this.getAllBooks();
    })
   }

   editStory(selected){
    debugger;
    this.createStoryForm.controls.id.setValue(selected.id)
    this.createStoryForm.controls.title.setValue(selected.title)
    this.createStoryForm.controls.description.setValue(selected.description)
    this.createStoryForm.controls.link.setValue(selected.link)
  }
  updateStory(){
    let record = {};
    record['title'] = this.createStoryForm.value.title
    record['description'] = this.createStoryForm.value.description
    record['link'] = this.createStoryForm.value.link
    record['status'] = "Active"
    this.loaderService.show(); 
     this.operation.updateStory( this.createStoryForm.value.id, record).then(success =>{
      this.loaderService.hide(); 
      this.alertService.update();
      this.createStoryForm.reset();
      this.getAllStory();
    })
  }
  
   
   createNewStory(){
    let record = {};
    record['title'] = this.createStoryForm.value.title
    record['description'] = this.createStoryForm.value.description
    record['link'] = this.createStoryForm.value.link
    record['status'] = "Active";
    record['createdDate'] = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
    this.loaderService.show(); 
     this.operation.createStory(record).then(success =>{
      console.log(success);
      this.loaderService.hide(); 
      this.alertService.save();
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
  
    // deleteBook(value){
    //       this.loaderService.show();  
    //       this.operation.deleteBook(value.id).then(success =>{
    //         console.log(success);
    //         this.loaderService.hide();  
    //         this.alertService.delete();
    //         this.getAllBooks();
    //   })
    // }


    editContact(selected){
      debugger;
      this.contacUsForm.controls.id.setValue(selected.id)
      this.contacUsForm.controls.title.setValue(selected.title)
      this.contacUsForm.controls.Name.setValue(selected.Name)
      this.contacUsForm.controls.Email.setValue(selected.Email)
      this.contacUsForm.controls.Mobile.setValue(selected.Mobile)
    }
    updateContact(){
      let record = {};
      record['title'] = this.contacUsForm.value.title
      record['Name'] = this.contacUsForm.value.Name
      record['Mobile'] = this.contacUsForm.value.Mobile
      record['Email'] = this.contacUsForm.value.Email
      this.loaderService.show(); 
       this.operation.updateContact( this.contacUsForm.value.id, record).then(success =>{
        this.loaderService.hide(); 
        this.alertService.update();
        this.contacUsForm.reset();
        this.getAllStory();
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
    this.loaderService.show(); 
     this.operation.newConatc(record).then(success =>{
      console.log(success);
      this.loaderService.hide(); 
      this.alertService.save();
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
  
    deleteConfirmation(value, type){

      this.confirmationDialogService.show();
      this.deleteRcordId = value.id;
      this.deleteRecordType = type;
    }

}
