import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {OperationsService} from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  apiResponse:any = [];
  subscription: Subscription;
  deleteTaskId: any;

  constructor(private operation:OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService) {
      this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
        if (status) {
          debugger;
          this.loaderService.show();
          this.operation.deleteTask(this.deleteTaskId).then(success =>{
            console.log(success);
            this.loaderService.hide();
            this.alertService.delete();
            this.getAllTask();
           
          })
        }
      });
     }

  ngOnInit(): void {
    this.getAllTask();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }
  getAllTask(){
    this.loaderService.show();
    this.operation.getAllTasks().subscribe(success =>{
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
  deleteTask(value){
    this.confirmationDialogService.show();
    this.deleteTaskId = value.id;
  }

}
