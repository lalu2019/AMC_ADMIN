import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OperationsService } from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';

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

  constructor(
    private operation: OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) {
    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        // debugger;
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
      description: ['', Validators.required],
      link: ['', Validators.required]
    });
    this.createClassForm = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', ],
      link: ['', Validators.required],
      source: ['Vimeo', Validators.required],
      Accessibility: ['Free', Validators.required],
      
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
      debugger;
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
          createdDate: e.payload.doc.data()['createdDate']
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
    record['CatName'] = categoryName[0].title;
    record['title'] = this.createClassForm.value.title;
    record['description'] = this.createClassForm.value.description;
    record['link'] = this.createClassForm.value.link;
    record['Accessibility'] = this.createClassForm.value.Accessibility;
    record['status'] = "Active";
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
    debugger;
    this.videoForm.patchValue({
      id: video.id,
      title: video.title,
      description: video.description,
      link: video.link,
    });
  }

  onUpdateForm() {
    let record = {};
    record['title'] = this.videoForm.value.title
    record['description'] = this.videoForm.value.description
    record['link'] = this.videoForm.value.link
    record['Accessibility'] = this.videoForm.value.Accessibility
    
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
