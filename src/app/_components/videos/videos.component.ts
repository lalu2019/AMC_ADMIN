import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import {OperationsService} from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  apiResponse:any = [];
  subscription: Subscription;
  videoForm: FormGroup; 
  deleteVideoId: any;

  constructor( 
    private operation:OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
    ) { 
      this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
        if (status) {
          debugger;
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
      title:['', Validators.required],
      description: ['', Validators.required],
      link: ['', Validators.required]                  
    });
    this.getAllVideo();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }

  getAllVideo(){
    this.loaderService.show();
    this.operation.getAllVideo().subscribe(success =>{
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

  onEditVideo(video) {
    this.videoForm.patchValue({
      title: video.title,
      description: video.description,
      link: video.link,              
    });
  }

  onUpdateForm() {
    alert('video form');
  }

  deletVideo(value){
    this.confirmationDialogService.show();
    this.deleteVideoId = value.id;
  }

}
