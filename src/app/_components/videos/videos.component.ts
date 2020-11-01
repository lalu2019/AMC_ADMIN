import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OperationsService } from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  apiResponse: any = [];
  subscription: Subscription;
  videoForm: FormGroup;
  deleteVideoId: any;
  createClassForm: FormGroup;
  commentVideoForm: FormGroup;
  videoCategory: any = [];
  commentData: any = [];
  selectedVideoId:any;
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };
  samhitawiseList:any = [
        {
          name:"Charak Sutrasthan"
        },
        {
          name:"Charak vimansthana"
        }
        ,
        {
          name:"Charak Nidansthan"
        },
        {
          name:"Charak Indryasthan"
        },
        {
          name:"Charak sharirstan"
        },
        {
          name:"Charak chikitsasthan"
        }
        ,
        {
          name:"Charak Sidhisthan"
        }
        ,
        {
          name:"Charak Kalpsthan"
        },
    
       {
          name:"Sushruta Sutrasthan"
        },
        {
          name:"Sushruta Sharirsthan"
        }
        ,
        {
          name:"Sushruta Chikitsasthan"
        }
        ,
        {
          name:"Sushruta Kalpsthan"
        }
        ,
        {
          name:"Sushruta Nidansthan"
        }
        ,
        {
          name:"Sushruta Uttartantra"
        }, 
    
        {
          name:"Astang Hridye & Other Samhita"
        },
    
      ]


    categoryList: any = [
    // {title: "Charak Samhita Poorvardh", icon: "charak_samhita_poorvardha.png"},
    // {title: "Charak Samhita Uttardha", icon: "charak_samhita_uttardha.png"},
    // {title: "Sushruta Samhita Poorvardha", icon: "sushruta_samhita_poorvardha.png"},
    // {title: "Sushruta Samhita Uttartantra", icon: "sushruta_samhita.png"},
     {title: "Ashtang hridya", icon: "ashtand_hridya.png"},
    {title: "Laghu Trayee & Other Samhitas", icon: "laghu_trayee.png"},
    {title: "Padarth Vigyan", icon: "padarth_vigyan.png"},
    {title: "Itihasa", icon: "itihasa.png"},
    {title: "Kriya Sharira", icon: "kriya_sharira.png"},
     {title: "Rachna Sharira", icon: "rachna_sharira.png"},
     {title: "Sanskrit", icon: "sanskrit.png"},
    {title: "Dravya Guna", icon: "dravya_guna.png"},
    {title: "Rasa-shastra & Bhaishajya Kalpana", icon: "bhaishajya_kalpana.png"},
    {title: "Agad Tantra", icon: "agad_tantra.png"},
    {title: "Swasthvrit", icon: "SWASTHVRIT.png"},
      {title: "Roga - nidana", icon: "roga_nidana.png"},
     {title: "Prasuti Tantra & Stri Vigyan", icon: "prasuti_tantra.png"},
     {title: "Kaumarbhritya", icon: "kaumar.png"},
     {title: "Kayachikitsa", icon: "kayachikitsa.png"},
     {title: "Shalya", icon: "SHALYA.png"},
     {title: "Shalkya", icon: "SHALKYA.png"},
    {title: "Panchakarma", icon: "panchakarma.png"},
    {title: "Research methodology & Medical statistics", icon: "research_methodology.png"},
    {title: "Modern", icon: "modern.png"}]

    // categoryList: any = [
    //   {title: "Padarth Vigyan", icon: "padarth_vigyan.png"},
    //   {title: "Itihasa", icon: "itihasa.png"},
    //   {title: "Kriya Sharira", icon: "kriya_sharira.png"},
    //    {title: "Rachna Sharira", icon: "rachna_sharira.png"},
    //    {title: "Sanskrit", icon: "sanskrit.png"},
    //   {title: "Dravya Guna", icon: "dravya_guna.png"},
    //   {title: "Rasa-shastra & Bhaishajya Kalpana", icon: "bhaishajya_kalpana.png"},
    //   {title: "Agad Tantra", icon: "agad_tantra.png"},
    //   {title: "Swasthvrit", icon: "SWASTHVRIT.png"},
    //     {title: "Roga - nidana", icon: "roga_nidana.png"},
    //    {title: "Prasuti Tantra & Stri Vigyan", icon: "prasuti_tantra.png"},
    //    {title: "Kaumarbhritya", icon: "kaumar.png"},
    //    {title: "Kayachikitsa", icon: "kayachikitsa.png"},
    //    {title: "Shalya", icon: "SHALYA.png"},
    //    {title: "Shalkya", icon: "SHALKYA.png"},
  
    //   {title: "Panchakarma", icon: "panchakarma.png"},
    //   {title: "Research methodology & Medical statistics", icon: "research_methodology.png"},
    //   {title: "Modern", icon: "modern.png"}] 
  selectedParentCat:any = "AIAPGET Regular courses";
  selectedChildCat:any = "Charak chikitsasthan"
  assignedBatch:any = 'A'
  constructor(
    private operation: OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        this.loaderService.show();
        this.operation.deletVideo(this.deleteVideoId).then(success => {
          console.log(success);
          this.loaderService.hide();
          this.alertService.delete();
          this.getAllVideo();
        })
      }
    });
  }

  ngOnInit(): void {
    this.videoForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', ],
      source: ['Vimeo', Validators.required],
      link: ['', Validators.required],
      // Accessibility: ['Free'],
      endDate:['', Validators.required],
      category: [''],
      childcategory: [''],
      orderIndex:[''],
      assignedBatch:['']

    });
    this.createClassForm = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['',],
      link: ['', Validators.required],
      source: ['Vimeo', Validators.required],
      // Accessibility: ['Paid'],
      endDate:['', Validators.required],
      childcategory: [''],
      orderIndex:['1'],
      assignedBatch:['']


    });
    this.commentVideoForm = this.formBuilder.group({
      comment: ['', Validators.required],
    });
    this.getAllVideo();
    this.getAllVideoCategory();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }

  
  getAllVideoCategory() {
    this.loaderService.show();
    this.operation.getCaetgories().subscribe(success => {
      this.loaderService.hide();
      this.videoCategory = success.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['Title'],
        };
      })
    })
  }
  changeFilter(parent, child, assignedBatch){
   
    if(parent == "Demo Lectures" || parent == "Orientation Lectures"){
      this.selectedChildCat = null;
      this.assignedBatch = null;
    }
    // console.log(this.selectedParentCat);
    // console.log( this.selectedChildCat);
    this.getAllVideo();
  }
  getAllVideo() {
    this.loaderService.show();

    this.operation.getAllVideo(this.selectedParentCat, this.selectedChildCat,  this.assignedBatch).then(success => {
      console.log(success);
      this.loaderService.hide();
      let arrayWithDateVerification = success.map(e => {
        return {
          id: e.id,
          title: e.data()['title'],
          description: e.data()['description'],
          status: e.data()['status'],
          link: e.data()['link'],
          // Accessibility: e.payload.doc.data()['link'],
          createdDate: e.data()['createdDate'],
          CatName:e.data()['CatName'],
          source:e.data()['source'],
          endDate:e.data()['endDate'],
          childcategory:e.data()['childcategory'],
          orderIndex:e.data()['orderIndex'],
          assignedBatch:e.data()['assignedBatch']
        };
      })
      this.apiResponse = arrayWithDateVerification.sort((a, b) => {
        return <any>a.orderIndex - <any> b.orderIndex;
      });
      console.log(this.apiResponse);
    })
  }

  addNewClass() {
    let categoryName = this.videoCategory.filter(data => {
      return data.id == this.createClassForm.value.category;
    });
    let record = {};
    record['CatId'] = this.createClassForm.value.category;
    record['CatName'] = this.createClassForm.value.category;
    record['title'] = this.createClassForm.value.title;
    record['description'] = this.createClassForm.value.description;
    record['link'] = this.createClassForm.value.link;
    // record['Accessibility'] = this.createClassForm.value.Accessibility;
    record['source'] = this.createClassForm.value.source;
    record['status'] = "Active";
    record['endDate'] = this.createClassForm.value.endDate;
    if(this.createClassForm.value.childcategory){
      record['childcategory'] = this.createClassForm.value.childcategory;
    }else{
      record['childcategory'] = '';
    }

    if(this.createClassForm.value.assignedBatch){
      record['assignedBatch'] = this.createClassForm.value.assignedBatch.toString();
    }
    
    record['orderIndex'] = this.createClassForm.value.orderIndex;
    record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    console.log(record);

    this.loaderService.show();
    this.operation.createVideo(record).then(success => {
      this.loaderService.hide();
      this.alertService.save();
      this.createClassForm.reset();
      this.createClassForm.patchValue({
        category: ''
      });
      this.getAllVideo();
    })
  }

  copyVideo(video) {
    this.createClassForm.patchValue({
      // id: video.id,
      title: video.title,
      description: video.description,
      link: video.link,
      source:video.source,
      endDate:video.endDate,
      orderIndex:video.orderIndex,
      childcategory:video.childcategory,
      category:video.CatId
      // assignedBatch:video.assignedBatch.toString().split(",")
      
    });
    console.log( this.createClassForm.value.title);
  }
  onEditVideo(video) {
     if(!video.assignedBatch) video.assignedBatch = [""]
    this.videoForm.patchValue({
      id: video.id,
      title: video.title,
      description: video.description,
      link: video.link,
      source:video.source,
      endDate:video.endDate,
      orderIndex:video.orderIndex,
      childcategory:video.childcategory,
      assignedBatch:video.assignedBatch.toString().split(",")
    });
    // this.videoForm.value.assignedBatch = this.videoForm.value.assignedBatch.split(",");
    console.log( this.videoForm.value.assignedBatch);
  }

  onUpdateForm() {
    let record = {};
    record['title'] = this.videoForm.value.title
    // record['description'] = this.videoForm.value.description
    record['link'] = this.videoForm.value.link
    // record['Accessibility'] = this.videoForm.value.Accessibility 
    record['source'] = this.videoForm.value.source;
    record['endDate'] = this.videoForm.value.endDate;

    record['orderIndex'] = this.videoForm.value.orderIndex;
    // console.log(this.videoForm.value.assignedBatch)

    if(this.videoForm.value.assignedBatch){
      record['assignedBatch'] = this.videoForm.value.assignedBatch.toString();
    }
    if(this.videoForm.value.childcategory){
      record['childcategory'] = this.videoForm.value.childcategory;
    }else{
      record['childcategory'] = '';
    }
    console.log(record)
    this.loaderService.show();
    this.operation.updateVideo(this.videoForm.value.id, record).then(success => {
      this.loaderService.hide();
      this.alertService.update();
      this.getAllVideo();
    })
  }

  deletVideo(value) {
    this.confirmationDialogService.show();
    this.deleteVideoId = value.id;
  }

 
  onCommentVideo(video) {
    this.selectedVideoId = video.id
    this.commentData = [];
    this.commentVideoForm.reset();
    this.getComments();
  }

  onSend() {
    this.saveComment(this.commentVideoForm.value.comment);
    this.commentVideoForm.reset();
  }

  getClass(comment){
    if(comment.userId == "admin@123456"){
      return "admin";
    }else{
      return "noAdmin";
    }
  }
  saveComment(text){
    console.log(text)
    let record = {};
    record["videoId"] =  this.selectedVideoId;
    record["comment"] =  text;
    record["userId"] =  "admin@123456";
    record["userName"] =  "Admin";
    record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

   this.operation.addComment(record).then(success =>{
      this.getComments();
      // this.message = '';
   })
  }

 getComments(){
   this.operation.getComments(this.selectedVideoId).then(success =>{
     // console.log(success);
     this.commentData = success.map(e => {
       return {
         id: e.id,
         userName: e.data()['userName'],
         userId: e.data()['userId'],
         videoId: e.data()['videoId'],
         comment: e.data()['comment'],
         createdDate: e.data()['createdDate'],


       };
     })
    
   })
 }

}
