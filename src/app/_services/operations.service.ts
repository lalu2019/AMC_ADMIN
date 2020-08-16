import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(private firestore: AngularFirestore,
    private http:HttpClient
    // private storage: AngularFireStorage,
  ) { }

  addToken(record) {
    return this.firestore.collection('frbTkn').add(record);
  }

  //Video section api
  createVideo(record) {
    return this.firestore.collection('videos').add(record);
  }
  
  getAllVideo(): Observable<any> {
    return this.firestore.collection('videos').snapshotChanges();
  }

  updateVideo(recordID, record) {
    return this.firestore.doc('videos/' + recordID).update(record);
  }

  deletVideo(record_id) {
    return this.firestore.doc('videos/' + record_id).delete();
  }

  //Tasks Section 
  createTask(record) {
    return this.firestore.collection('tasks').add(record);
  }

  getAllTasks(): Observable<any> {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  updateTask(recordID, record) {
    return this.firestore.doc('tasks/' + recordID).update(record);
  }

  deleteTask(record_id) {
    return this.firestore.doc('tasks/' + record_id).delete();

  }

  //Test Secttion
  createTest(record) {
    return this.firestore.collection('testset').add(record);
  }

  getAllTest(): Observable<any> {
    return this.firestore.collection('testset').snapshotChanges();
  }

  deleteSet(record_id) {
    return this.firestore.doc('testset/' + record_id).delete();
  }
  async insertQuesiton(record){
    return this.firestore.collection('testset').doc(record.set_id).collection('QuesitonSet').add(record);
    // return this.firestore.collection('QuesitonSet').add(record);
  }

  //Users Section
  createUsers(record) {
    return this.firestore.collection('Users').add(record);
  }

  updateUsers(recordID, record)  {
    return this.firestore.doc('Users/' + recordID).update(record);
  }

  getAllUsers(): Observable<any> {
    return this.firestore.collection('Users').snapshotChanges();
  }

  //Story section api
  createStory(record) {
    return this.firestore.collection('stories').add(record);
  }
  getAllStory(): Observable<any> {
    return this.firestore.collection('stories').snapshotChanges();
  }
  updateStory(recordID, record) {
    // return this.firestore.collection('videos').add(record);
    return this.firestore.doc('stories/' + recordID).update(record);

  }
  deleteStory(record_id) {
    return this.firestore.doc('stories/' + record_id).delete();
  }

  //Book section api
  AddNewBook(record) {
    return this.firestore.collection('Books').add(record);
  }
  getAllBooks(): Observable<any> {
    return this.firestore.collection('Books').snapshotChanges();
  }
  updateBook(recordID, record) {
    return this.firestore.doc('Books/' + recordID).update(record);
  }
  deleteBook(record_id) {
    return this.firestore.doc('Books/' + record_id).delete();
  }

  //Contact Us section api
  newConatc(record) {
    return this.firestore.collection('ContactUs').add(record);
  }
  getAllContact(): Observable<any> {
    return this.firestore.collection('ContactUs').snapshotChanges();
  }
  updateContact(recordID, record) {
    return this.firestore.doc('ContactUs/' + recordID).update(record);
  }
  DeleteContact(record_id) {
    return this.firestore.doc('ContactUs/' + record_id).delete();
  }

  //Mmbership  section api
  addMembership(record) {
    return this.firestore.collection('Membership').add(record);
  }
  getMembership(): Observable<any> {
    return this.firestore.collection('Membership').snapshotChanges();
  }
  updateMembership(recordID, record) {
    return this.firestore.doc('Membership/' + recordID).update(record);
  }
  deleteMembership(record_id) {
    return this.firestore.doc('Membership/' + record_id).delete();
  }

  //Tips  section api
  addTips(record) {
    return this.firestore.collection('Tips').add(record);
  }
  getTips(): Observable<any> {
    return this.firestore.collection('Tips').snapshotChanges();
  }
  updateTips(recordID, record) {
    return this.firestore.doc('Tips/' + recordID).update(record);
  }
  deleteTips(record_id) {
    return this.firestore.doc('Tips/' + record_id).delete();
  }
  //Category  section api
  addCategories(record) {
    return this.firestore.collection('Category').add(record);
  }
  getCaetgories(): Observable<any> {
    return this.firestore.collection('Category').snapshotChanges();
  }
  //Enquery Section
  AddInquery(record) {
    return this.firestore.collection('Enquery').add(record);
  }
  getInquiry(): Observable<any> {
    return this.firestore.collection('Enquery').snapshotChanges();
  }

  reportQuestion(record) {
    return this.firestore.collection('reportedQuestion').add(record);
  }
  getReportedQuestion() {
    return this.firestore.collection('reportedQuestion').snapshotChanges();
   
  }
  updateReportedQuestion(recordID, record) {
    return this.firestore.doc('reportedQuestion/' + recordID).update(record);
  }

  sendPushNotification(title, description, tokens){

    const headers = new HttpHeaders()
            .set("Content-Type", "application/json").set("Authorization", "key=AAAA-r1-lgs:APA91bG-7tvD2iPve8L6E5VxV9UfNSuwJE2M5inTrTR8tNb8ZvRdaF3m7Nd1OfJh9quM5WiT77oMQERNSxh_xxHdI7lvJ7MFClDuh08tXYFwSetszO2A_mwnCYYG5HrVlVh6zjRiZfQN")
       
              this.http.post("https://fcm.googleapis.com/fcm/send",
              {
                "topic" : "marketing",
                "notification":{
                    "title":title,
                    "body":description
                  },
                  "to":"/topics/marketing"
              }, {headers})
                .subscribe(
                    (val) => {
                        console.log("POST call successful value returned in body", 
                                    val);
                    },
                    response => {
                        console.log("POST call in error", response);
                    },
                    () => {
                        console.log("The POST observable is now completed.");
                    });


  }

}
