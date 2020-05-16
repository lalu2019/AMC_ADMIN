import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OperationsService } from '../../_services/operations.service'
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { AlertService } from 'src/app/_services/alert.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  createTaskForm: FormGroup;
  updateTaskForm: FormGroup;
  apiResponse: any = [];
  subscription: Subscription;
  deleteTaskId: any;

  constructor(
    private formBuilder: FormBuilder,
    private operation: OperationsService,
    private loaderService: LoaderService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService) {
    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        this.loaderService.show();
        this.operation.deleteTask(this.deleteTaskId).then(success => {
          console.log(success);
          this.loaderService.hide();
          this.alertService.delete();
          this.getAllTask();

        })
      }
    });
  }

  ngOnInit(): void {
    this.createTaskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      endDate: ['', Validators.required],
      link: [''],
    });
    this.updateTaskForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.getAllTask();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.confirmationDialogService.confirmationYesButtonClick(false);
  }
  getAllTask() {
    this.loaderService.show();
    this.operation.getAllTasks().subscribe(success => {
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

  addNewTask() {
    let record = {};
    record['title'] = this.createTaskForm.value.title
    record['description'] = this.createTaskForm.value.description
    record['link'] = this.createTaskForm.value.link
    record['status'] = "Pending";
    record['endDate'] = this.createTaskForm.value.endDate;
    record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.loaderService.show();
    this.operation.createTask(record).then(success => {
      console.log(success);
      this.loaderService.hide();
      this.alertService.save();
      this.createTaskForm.reset();
    })
  }

  onEditTask(task) {
    debugger;
    this.updateTaskForm.patchValue({
      id: task.id,
      title: task.title,
      description: task.description,
    });
  }

  deleteTask(value) {
    this.confirmationDialogService.show();
    this.deleteTaskId = value.id;
  }

  onUpdateForm() {
    let record = {};
    record['title'] = this.updateTaskForm.value.title
    record['description'] = this.updateTaskForm.value.description
    this.loaderService.show();
    this.operation.updateTask(this.updateTaskForm.value.id, record).then(success => {
      this.loaderService.hide();
      this.alertService.update();
      this.getAllTask();
    })
  }

}
