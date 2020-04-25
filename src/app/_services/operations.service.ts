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
  getVideo(record) {
    return this.firestore.collection('videos').add(record);
  }
  updateVideo(record) {
    return this.firestore.collection('videos').add(record);
  }
  deleteVideo(record) {
    return this.firestore.collection('videos').add(record);
  }

  //Tasks Section 
  createTask(record) {
    return this.firestore.collection('frbTkn').add(record);
  }

  //Test Secttion

  createTest(record) {
    return this.firestore.collection('frbTkn').add(record);
  }

  //Users Section

  createUsers(record) {
    return this.firestore.collection('frbTkn').add(record);
  }
}
