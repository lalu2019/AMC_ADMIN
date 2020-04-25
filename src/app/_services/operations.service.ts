import { Injectable } from '@angular/core';

import { AngularFirestore , AngularFirestoreDocument} from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  constructor(  private firestore: AngularFirestore,
    private storage: AngularFireStorage,
 ) { }

  addToken(record) {
    return this.firestore.collection('frbTkn').add(record);
  }

  //Video section api
  createVideo(record) {
    return this.firestore.collection('videos').add(record);
  }
  getAllVideo() {
    return this.firestore.collection('videos').snapshotChanges();
  }
  updateVideo(recordID, record) {
    // return this.firestore.collection('videos').add(record);
    return this.firestore.doc('videos/' + recordID).update(record);

  }
  deletVideo(record_id) {
    return this.firestore.doc('videos/' + record_id).delete();
  }

  //Tasks Section 
  createTask(record) {
    return this.firestore.collection('tasks').add(record);
  }

  getAllTasks() {
    return this.firestore.collection('tasks').snapshotChanges();
  }
  updateTask(recordID, record) {
    // return this.firestore.collection('videos').add(record);
    return this.firestore.doc('tasks/' + recordID).update(record);

  }
  deleteTask(record_id) {
    return this.firestore.doc('tasks/' + record_id).delete();

  }
  //Test Secttion

  createTest(record) {
    return this.firestore.collection('frbTkn').add(record);
  }

  //Users Section

  createUsers(record) {
    return this.firestore.collection('Users').add(record);
  }
  getAllUsers(){
    return this.firestore.collection('Users').snapshotChanges();
  }

   //Story section api
   createStory(record) {
    return this.firestore.collection('stories').add(record);
    }
    getAllStory() {
      return this.firestore.collection('stories').snapshotChanges();
    }
    updateStory(recordID, record) {
      // return this.firestore.collection('videos').add(record);
      return this.firestore.doc('stories/' + recordID).update(record);

    }
    deleteStory(record_id) {
      return this.firestore.doc('stories/' + record_id).delete();
    }

}
