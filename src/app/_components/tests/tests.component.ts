import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

  apiResponse: any = [];
  createTestForm: FormGroup;
  updateTestForm: FormGroup;
  deleteTestId: any;
  subscription: Subscription;

  constructor(
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService
  ) { 
    // this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
    //   if (status) {
    //     this.loaderService.show();
    //     this.operation.deleteTask(this.deleteTaskId).then(success => {
    //       console.log(success);
    //       this.loaderService.hide();
    //       this.alertService.delete();
    //       this.getAllTask();

    //     })
    //   }
    // });
  }

  ngOnInit(): void {
    this.createTestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      sex: ['', Validators.required]
    });

    this.updateTestForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      sex: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.confirmationDialogService.confirmationYesButtonClick(false);
  }

  getAllTest() {
    // this.loaderService.show();
    // this.operation.getAllTasks().subscribe(success => {
    //   console.log(success);
    //   this.loaderService.hide();
    //   this.apiResponse = success.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       title: e.payload.doc.data()['title'],
    //       description: e.payload.doc.data()['description'],
    //       status: e.payload.doc.data()['status'],
    //       link: e.payload.doc.data()['link'],
    //       createdDate: e.payload.doc.data()['createdDate']
    //     };
    //   })
    //   console.log(this.apiResponse);
    // })
  }

  addNewTest() {
    // let record = {};
    // record['title'] = this.createTestForm.value.title
    // record['description'] = this.createTestForm.value.description
    // record['link'] = this.createTestForm.value.link
    // record['status'] = "Pending";
    // record['endDate'] = this.createTestForm.value.endDate;
    // record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    // this.loaderService.show();
    // this.operation.createTask(record).then(success => {
    //   console.log(success);
    //   this.loaderService.hide();
    //   this.alertService.save();
    //   this.createTestForm.reset();
    // })
  }

  onEditTest(test) {
    // this.updateTestForm.patchValue({
    //   id: test.id,
    //   title: test.title,
    //   description: test.description,
    // });
  }

  onUpdateForm() {
    // let record = {};
    // record['title'] = this.updateTestForm.value.title
    // record['description'] = this.updateTestForm.value.description
    // this.loaderService.show();
    // this.operation.updateTask(this.updateTestForm.value.id, record).then(success => {
    //   this.loaderService.hide();
    //   this.alertService.update();
    //   this.getAllTask();
    // })
  }

  deleteTest(value) {
    // this.confirmationDialogService.show();
    // this.deleteTestId = value.id;
  }

}
