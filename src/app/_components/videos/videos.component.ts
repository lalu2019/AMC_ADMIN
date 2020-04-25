import { Component, OnInit } from '@angular/core';
import {OperationsService} from '../../_services/operations.service'

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  apiResponse:any = [];

  constructor( private operation:OperationsService) { }

  ngOnInit(): void {
    this.getAllVideo();
  }

  getAllVideo(){
    this.operation.getAllVideo().subscribe(success =>{
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
  deletVideo(value){

    this.operation.deletVideo(value.id).then(success =>{
      console.log(success);
      this.getAllVideo();
     
    })
  }

}
