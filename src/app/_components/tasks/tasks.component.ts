import { Component, OnInit } from '@angular/core';
import {OperationsService} from '../../_services/operations.service'


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  apiResponse:any = [];

  constructor(private operation:OperationsService) { }

  ngOnInit(): void {
    this.getAllTask();
  }
  getAllTask(){
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
  deleteTask(value){

    this.operation.deleteTask(value.id).then(success =>{
      console.log(success);
      this.getAllTask();
     
    })
  }

}
