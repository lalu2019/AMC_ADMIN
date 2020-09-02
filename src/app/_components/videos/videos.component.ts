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

  categoryList: any = [{title: "Charak Samhita Poorvardh", icon: "charak_samhita_poorvardha.png"},
  {title: "Charak Samhita Uttardha", icon: "charak_samhita_uttardha.png"},
  {title: "Sushruta Samhita Poorvardha", icon: "sushruta_samhita_poorvardha.png"},
  {title: "Sushruta Samhita Uttartantra", icon: "sushruta_samhita.png"},
   {title: "Ashtang hridya", icon: "ashtand_hridya.png"},
  {title: "Laghu Trayee & Other Samhitas", icon: "laghu_trayee.png"},
  {title: "Padarth Vigyan", icon: "padarth_vigyan.png"},
  {title: "Itihasa", icon: "itihasa.png"},
  {title: "Kriya Sharira", icon: "kriya_sharira.png"},
   {title: "Rachna Sharira", icon: "rachna_sharira.png"},
   {title: "Sanskrit", icon: "sanskrit.png"},
  {title: "Dravya Guna", icon: "dravya_guna"},
  {title: "Rasa-shastra & Bhaishajya Kalpana", icon: "bhaishajya_kalpana.png"},
  {title: "Agad Tantra", icon: "agad_tantra.png"},
    {title: "Roga - nidana", icon: "roga_nidana.png"},
   {title: "Prasuti Tantra & Stri Vigyan", icon: "prasuti_tantra.png"},
   {title: "Kayachikitsa", icon: "kayachikitsa.png"},
  {title: "Panchakarma", icon: "panchakarma.png"},
  {title: "Research methodology & Medical statistics", icon: "research_methodology.png"},
  {title: "Modern", icon: "modern.png"}] 

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
      Accessibility: ['Free', Validators.required],
      endDate:['', Validators.required],
      childcategory: [''],

    });
    this.createClassForm = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['',],
      link: ['', Validators.required],
      source: ['Vimeo', Validators.required],
      Accessibility: ['Free', Validators.required],
      endDate:['', Validators.required],
      childcategory: [''],

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

  getAllVideo() {
    this.loaderService.show();
    this.operation.getAllVideo().subscribe(success => {
      console.log(success);
      this.loaderService.hide();
      this.apiResponse = success.map(e => {
        return {
          id: e.payload.doc.id,
          title: e.payload.doc.data()['title'],
          description: e.payload.doc.data()['description'],
          status: e.payload.doc.data()['status'],
          link: e.payload.doc.data()['link'],
          Accessibility: e.payload.doc.data()['link'],
          createdDate: e.payload.doc.data()['createdDate'],
          CatName:e.payload.doc.data()['CatName'],
          source:e.payload.doc.data()['source'],
          endDate:e.payload.doc.data()['endDate'],
          childcategory:e.payload.doc.data()['childcategory']
        };
      })
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
    record['Accessibility'] = this.createClassForm.value.Accessibility;
    record['source'] = this.createClassForm.value.source;
    record['status'] = "Active";
    record['endDate'] = this.createClassForm.value.endDate;
    if(this.createClassForm.value.childcategory){
      record['childcategory'] = this.createClassForm.value.childcategory;
    }else{
      record['childcategory'] = '';
    }
    
    record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.loaderService.show();
    this.operation.createVideo(record).then(success => {
      console.log(success);
      this.loaderService.hide();
      this.alertService.save();
      this.createClassForm.reset();
      this.createClassForm.patchValue({
        category: ''
      });
    })
  }

  onEditVideo(video) {
    this.videoForm.patchValue({
      id: video.id,
      title: video.title,
      description: video.description,
      link: video.link,
      source:video.source,
      endDate:video.endDate
    });
  }

  onUpdateForm() {
    let record = {};
    record['title'] = this.videoForm.value.title
    // record['description'] = this.videoForm.value.description
    record['link'] = this.videoForm.value.link
    record['Accessibility'] = this.videoForm.value.Accessibility 
    record['source'] = this.videoForm.value.source;
    record['endDate'] = this.videoForm.value.endDate;
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

  onCommentVideo() {
    this.commentData = [];
    this.commentVideoForm.reset();
  }

  onSend() {
    let currentDateTime = new Date();
    let comment = {
      commentText: this.commentVideoForm.value.comment,
      currentDateTime: currentDateTime
    }
    this.commentData.push(comment);
    this.commentVideoForm.reset();
  }

}
