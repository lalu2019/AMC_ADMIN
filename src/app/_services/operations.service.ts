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

  addToken(record: unknown) {
    return this.firestore.collection('frbTkn').add(record);
  }

  //Video section api
  createVideo(record: unknown) {
    return this.firestore.collection('videos').add(record);
  }
  

  getAllVideo(category: string, childcategory: string): Promise<any[]> {
    if(category && !childcategory){
      return this.firestore.collection<any>('videos').ref.where('CatId', '==', category)
      .get().then((ref) => {
       return ref.docs;
      })
    }
    if(childcategory){
      console.log(category)
      return this.firestore.collection<any>('videos').ref.where('childcategory', '==', childcategory).where('CatId', '==', category)
      .get().then((ref) => {
       return ref.docs;
      })
    }
  
  }

  // getAllVideo(): Observable<any> {
  //   return this.firestore.collection('videos').snapshotChanges();
  // }

  updateVideo(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('videos/' + recordID).update(record);
  }

  deletVideo(record_id: string) {
    return this.firestore.doc('videos/' + record_id).delete();
  }

  //Tasks Section 
  createTask(record: unknown) {
    return this.firestore.collection('tasks').add(record);
  }

  getAllTasks(): Observable<any> {
    return this.firestore.collection('tasks').snapshotChanges();
  }

  updateTask(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('tasks/' + recordID).update(record);
  }

  deleteTask(record_id: string) {
    return this.firestore.doc('tasks/' + record_id).delete();

  }

  //Test Secttion
  createTest(record: unknown) {
    return this.firestore.collection('testset').add(record);
  }

  getAllTest(): Observable<any> {
    return this.firestore.collection('testset').snapshotChanges();
  }

  deleteSet(record_id: string) {
    return this.firestore.doc('testset/' + record_id).delete();
  }
  async insertQuesiton(record: { [x: string]: any; set_id?: any; }){
    return this.firestore.collection('testset').doc(record.set_id).collection('QuesitonSet').add(record);
    // return this.firestore.collection('QuesitonSet').add(record);
  }

  //Users Section
  createUsers(record: unknown) {
    return this.firestore.collection('Users').add(record);
  }

  updateUsers(recordID: string, record: Partial<unknown>)  {
    return this.firestore.doc('Users/' + recordID).update(record);
  }

  getUserWithouFilter(){
    return this.firestore.collection('Users').snapshotChanges();

  }
  getAllUsers(name: any, mobile: any, membershipType: any) {
      if(name && mobile && membershipType){
        return this.firestore.collection<any>('Users').ref.where('userType', '==', membershipType).where('FullName', '==', name).where('Mobile', '==', mobile)
        .get().then((ref) => {
         return ref.docs;
        })
      }
      if(!name && mobile && membershipType){
        return this.firestore.collection<any>('Users').ref.where('userType', '==', membershipType).where('Mobile', '==', mobile)
        .get().then((ref) => {
         return ref.docs;
        })
      }
      if(name && !mobile && membershipType){
        return this.firestore.collection<any>('Users').ref.where('userType', '==', membershipType).where('FullName', '==', name)
        .get().then((ref) => {
         return ref.docs;
        })
      }
      if(!name && !mobile && membershipType){
        return this.firestore.collection<any>('Users').ref.where('userType', '==', membershipType)
        .get().then((ref) => {
         return ref.docs;
        })
      }

     
  }

  deleteUsers(record_id: string) {
    return this.firestore.doc('Users/' + record_id).delete();
  }

  //Story section api
  createStory(record: unknown) {
    return this.firestore.collection('stories').add(record);
  }
  getAllStory(): Observable<any> {
    return this.firestore.collection('stories').snapshotChanges();
  }
  updateStory(recordID: string, record: Partial<unknown>) {
    // return this.firestore.collection('videos').add(record);
    return this.firestore.doc('stories/' + recordID).update(record);

  }
  deleteStory(record_id: string) {
    return this.firestore.doc('stories/' + record_id).delete();
  }

  //Book section api
  AddNewBook(record: unknown) {
    return this.firestore.collection('Books').add(record);
  }
  getAllBooks(): Observable<any> {
    return this.firestore.collection('Books').snapshotChanges();
  }
  updateBook(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('Books/' + recordID).update(record);
  }
  deleteBook(record_id: string) {
    return this.firestore.doc('Books/' + record_id).delete();
  }

  //Contact Us section api
  newConatc(record: unknown) {
    return this.firestore.collection('ContactUs').add(record);
  }
  getAllContact(): Observable<any> {
    return this.firestore.collection('ContactUs').snapshotChanges();
  }
  updateContact(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('ContactUs/' + recordID).update(record);
  }
  DeleteContact(record_id: string) {
    return this.firestore.doc('ContactUs/' + record_id).delete();
  }

  //Mmbership  section api
  addMembership(record: unknown) {
    return this.firestore.collection('Membership').add(record);
  }
  getMembership(): Observable<any> {
    return this.firestore.collection('Membership').snapshotChanges();
  }
  updateMembership(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('Membership/' + recordID).update(record);
  }
  deleteMembership(record_id: string) {
    return this.firestore.doc('Membership/' + record_id).delete();
  }

  //Tips  section api
  addTips(record: unknown) {
    return this.firestore.collection('Tips').add(record);
  }
  getTips(): Observable<any> {
    return this.firestore.collection('Tips').snapshotChanges();
  }
  updateTips(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('Tips/' + recordID).update(record);
  }
  deleteTips(record_id: string) {
    return this.firestore.doc('Tips/' + record_id).delete();
  }
  //Category  section api
  addCategories(record: unknown) {
    return this.firestore.collection('Category').add(record);
  }
  getCaetgories(): Observable<any> {
    return this.firestore.collection('Category').snapshotChanges();
  }
  //Enquery Section
  AddInquery(record: unknown) {
    return this.firestore.collection('Enquery').add(record);
  }
  getInquiry(): Observable<any> {
    return this.firestore.collection('Enquery').snapshotChanges();
  }

  reportQuestion(record: unknown) {
    return this.firestore.collection('reportedQuestion').add(record);
  }
  getReportedQuestion() {
    return this.firestore.collection('reportedQuestion').snapshotChanges();
   
  }
  updateReportedQuestion(recordID: string, record: Partial<unknown>) {
    return this.firestore.doc('reportedQuestion/' + recordID).update(record);
  }

  getComments(videoId: any): Promise<any[]> {
    return this.firestore.collection<any>('video_comments').ref.where('videoId', '==', videoId)
   .get().then((ref) => {
    return ref.docs;
   })
  }
  addComment(record: unknown) {
    return this.firestore.collection('video_comments').add(record);
  }

  sendPushNotification(title: any, description: any, tokens: string){

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
