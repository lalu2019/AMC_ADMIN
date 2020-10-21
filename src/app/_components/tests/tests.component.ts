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
  categoryList: any = [
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

    samhitawiseList:any = [
          {
        name:"Charak Sutrasthan"
      },
      {
        name:"Charak vimansthana"
      }
      ,
      {
        name:"Charak Nidansthan"
      }
      ,
      {
        name:"Charak Indryasthan"
      },
      {
        name:"Charak sharirstan"
      },
      {
        name:"Charak chikitsasthan"
      }
      ,
      {
        name:"Charak Sidhisthan"
      }
      ,
      {
        name:"Charak Kalpsthan"
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
      
   yearFilter:any = '';
   parentCatFilter:any = '';
   childCatFilter:any = '';
   questionsData:any = [];
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
      description: [''],
      testtime: ['90'],
      totalquestion: [''],
      marks: [''],
      category: ['', Validators.required],
      childcategory: [''],
      year: ['2020', Validators.required],
      excelFile: ['', Validators.required],
      orderIndex:['1']
    });

    this.updateTestForm = this.formBuilder.group({
      id: [''],
      testname: ['', Validators.required],
      description: [''],
      testtime: [''],
      totalquestion: [''],
      marks: [''],
      category: ['', Validators.required],
      childcategory: [''],
      year: ['',],
      // excelFile: ['', Validators.required],
      orderIndex:['1']
    });
    this.getAllTest();


    const that = this;
    document.getElementById("fileImport").onchange= function(e: Event) {
      let file = (<HTMLInputElement>e.target).files[0];
      // console.log(file);
      readXlsxFile(file).then((rows) => {
        let localArray = [];
       //  that.UploadedFileContent = rows;
         for(let i=0;i<rows.length; i ++){
          // localArray.push({title:rows[i][0], icon:rows[i][1]})

          that.UploadedFileContent.push(rows[i]);
         }
         console.log(localArray);

      })
     }


  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
    // this.confirmationDialogService.confirmationYesButtonClick(false);
  }

  ResetFilter(){
    this.yearFilter = '';
    this.parentCatFilter = '';
    this.childCatFilter = '';

    this.getAllTest();
  }
  fetchFilter(){
   
    console.log(this.yearFilter);
    console.log(this.parentCatFilter);
    console.log(this.childCatFilter);
   
    if(this.yearFilter || this.parentCatFilter ||  this.childCatFilter){
      this.getFilteredData();
    }else{
      this.getAllTest();
    }
  }

  openQuestions(id){
    this.operation.getQuestions(id).subscribe(success => {
      console.log(success);
      this.loaderService.hide();
     let questionData = success.map(e => {
        return {
          id:e.payload.doc.id,
          Question:e.payload.doc.data()['Question'],
          set_id:e.payload.doc.data()['set_id'],
          Q_NO:e.payload.doc.data()['Q_NO'],
          a:e.payload.doc.data()['a'],
          b:e.payload.doc.data()['b'],
          c:e.payload.doc.data()['c'],
          d:e.payload.doc.data()['d'],
          answer:e.payload.doc.data()['answer'].toLowerCase(),
          selectedOption:'',
          edittable:false
        };
      })

      this.questionsData = questionData.sort((a, b) => {
        return <any>a.Q_NO - <any> b.Q_NO;
      });
      console.log(this.apiResponse);
    })
  }
  updateQuestion(item){
    console.log(item);
    let record = {};
    record['Question'] = item.Question
    record['a'] = item.a
    record['b'] =item.b
    record['c'] = item.c
    record['d'] = item.d
    record['answer'] = item.answer
    record['Updated'] = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

      this.operation.updateQuestin(item.id,item.set_id, record).then(success =>{
        console.log(success);
        this.alertService.update();
      })
  }
  getFilteredData() {
  
    this.loaderService.show();
    this.operation.filterData(this.yearFilter, this.parentCatFilter,  this.childCatFilter).then(success => {
      console.log(success);
      this.loaderService.hide();
      this.apiResponse = success.map(e => {
        return {
          id: e.id,
          testname: e.data()['testname'],
          description: e.data()['description'],
          testtime: e.data()['testtime'],
          totalquestion: e.data()['totalquestion'],
          marks: e.data()['marks'],
          category: e.data()['category'],
          year: e.data()['year'],
          createdDate: e.data()['createdDate'],
          childcategory:e.data()['childcategory'],
          orderIndex:e.data()['orderIndex']
        };
      })
      console.log(this.apiResponse);
    })
  }

  addNewNotifications(title, description){
    this.operation.sendPushNotification(title, description, '') 
    this.alertService.save();
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
          createdDate: e.payload.doc.data()['createdDate'],
          childcategory:e.payload.doc.data()['childcategory'],
          orderIndex:e.payload.doc.data()['orderIndex']
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
    record['testtime'] = this.UploadedFileContent.length
    record['totalquestion'] = this.UploadedFileContent.length;
    record['marks'] = this.UploadedFileContent.length *4;
    record['category'] = this.createTestForm.value.category;
    record['year'] = this.createTestForm.value.year;
    // record['questions'] =this.UploadedFileContent;
    if(this.createTestForm.value.childcategory){
      record['childcategory'] = this.createTestForm.value.childcategory;
    }else{
      record['childcategory'] = '';
    }
    record['orderIndex'] =  this.createTestForm.value.orderIndex;
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
    record['set_id'] = id; //
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
    console.log(test)
    this.updateTestForm.patchValue({
      id: test.id,
      testname: test.testname,
      description: test.description,
      testtime:test.testtime,
      totalquestion:test.totalquestion,
      marks:test.marks,
      category:test.category,
      childcategory:test.childcategory,
      year:test.year,
      orderIndex:test.orderIndex
    });
  }
  updateTest(){

    let record = {};
    record['testname'] = this.updateTestForm.value.testname;
    record['description'] = this.updateTestForm.value.description;
    record['testtime'] = this.updateTestForm.value.testtime;
    record['totalquestion'] = this.updateTestForm.value.totalquestion;
    record['marks'] = this.updateTestForm.value.marks;
    record['category'] = this.updateTestForm.value.category;
    record['year'] = this.updateTestForm.value.year;
    // record['questions'] =this.UploadedFileContent;
    if(this.updateTestForm.value.childcategory){
      record['childcategory'] = this.updateTestForm.value.childcategory;
    }else{
      record['childcategory'] = '';
    }
    record['orderIndex'] =  this.updateTestForm.value.orderIndex;
    this.loaderService.show();
    this.operation.updateTest( this.updateTestForm.value.id, record).then(success => {
      this.loaderService.hide();
      this.alertService.save();
     // this.addNewNotifications("Updates in test paper",  this.updateTestForm.value.testname)
      this.getAllTest();
    })
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
