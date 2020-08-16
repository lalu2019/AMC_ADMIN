import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoaderService } from 'src/app/_services/loader.service';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { OperationsService } from '../../_services/operations.service'
import { AlertService } from 'src/app/_services/alert.service';
import readXlsxFile from 'read-excel-file'


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
  UploadedFileContent: any = [];
  test_id:any

  constructor(
    private loaderService: LoaderService,
    private formBuilder: FormBuilder,
    private confirmationDialogService: ConfirmationDialogService,
    private operation: OperationsService,
    private alertService: AlertService
  ) { 
    this.subscription = this.confirmationDialogService.isConfirmationYesButtonClick.subscribe(status => {
      if (status) {
        this.loaderService.show();
        console.log(this.test_id);
        this.operation.deleteSet(this.test_id).then(success => {
          console.log(success);
          this.loaderService.hide();
          this.alertService.delete();
          this.getAllTest();
        })
      }
    });
  }

  ngOnInit(): void {
    this.createTestForm = this.formBuilder.group({
      testname: ['', Validators.required],
      description: ['', Validators.required],
      testtime: ['90', Validators.required],
      totalquestion: [''],
      marks: [''],
      category: ['', Validators.required],
      childcategory: [''],
      year: ['2020', Validators.required],
      excelFile: ['', Validators.required]
    });

    this.updateTestForm = this.formBuilder.group({
      id: [''],
      testname: ['', Validators.required],
      description: ['', Validators.required],
      testtime: ['', Validators.required],
      totalquestion: [''],
      marks: [''],
      category: ['', Validators.required],
      year: ['', Validators.required]
    });
    this.getAllTest();


    const that = this;
    document.getElementById("fileImport").onchange= function(e: Event) {
      let file = (<HTMLInputElement>e.target).files[0];
      console.log(file);
      readXlsxFile(file).then((rows) => {
        console.log(rows);
       //  that.UploadedFileContent = rows;
         for(let i=0;i<rows.length; i ++){
          that.UploadedFileContent.push(rows[i]);
         }
      })
     }


  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.confirmationDialogService.confirmationYesButtonClick(false);
  }


  getAllTest() {
  
    this.loaderService.show();
    this.operation.getAllTest().subscribe(success => {
      console.log(success);
      this.loaderService.hide();
      this.apiResponse = success.map(e => {
        return {
          id: e.payload.doc.id,
          testname: e.payload.doc.data()['testname'],
          description: e.payload.doc.data()['description'],
          testtime: e.payload.doc.data()['testtime'],
          totalquestion: e.payload.doc.data()['totalquestion'],
          marks: e.payload.doc.data()['marks'],
          category: e.payload.doc.data()['category'],
          year: e.payload.doc.data()['year'],
          createdDate: e.payload.doc.data()['createdDate']
        };
      })
      console.log(this.apiResponse);
    })
  }

  addNewTest() {
  
    if(this.UploadedFileContent.length <= 0){
    return false;
    }
    let record = {};
    record['testname'] = this.createTestForm.value.testname
    record['description'] = this.createTestForm.value.description
    record['testtime'] = this.createTestForm.value.testtime
    record['totalquestion'] = this.UploadedFileContent.length;
    record['marks'] = this.UploadedFileContent.length *4;
    record['category'] = this.createTestForm.value.category;
    record['year'] = this.createTestForm.value.year;
    // record['questions'] =this.UploadedFileContent;
    record['createdDate'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    this.loaderService.show();
    this.operation.createTest(record).then(success => {
      console.log(success.id);
      this.loaderService.hide();
      this.alertService.save();
      this.createTestForm.reset();
      this.insertQuestions(success.id);
      this.getAllTest();
    })
  }

  insertQuestions(id){
      for(let i=0;i<this.UploadedFileContent.length; i ++){
          this.insertCat(id, this.UploadedFileContent[i]);
         }
  }

  async insertCat(id, row) {

    let record = {};
    record['set_id'] = id;
    record['Q_NO'] = row[0];
    record['Question'] = row[1];
    record['a'] = row[2];
    record['b'] = row[3];
    record['c'] = row[4];
    record['d'] = row[5];
    record['answer'] = row[6];
    this.operation.insertQuesiton(record).then(success => {
      console.log(success);
    })
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
    this.confirmationDialogService.show();
    this.test_id = value.id;
  }

}
