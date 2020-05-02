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

    //Book section api
    AddNewBook(record) {
      return this.firestore.collection('Books').add(record);
    }
    getAllBooks() {
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
    getAllContact() {
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
      getMembership() {
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
      getTips() {
        return this.firestore.collection('Tips').snapshotChanges();
      }
      updateTips(recordID, record) {
        return this.firestore.doc('Tips/' + recordID).update(record);
      }
       deleteTips(record_id) {
        return this.firestore.doc('Tips/' + record_id).delete();
      }

}
