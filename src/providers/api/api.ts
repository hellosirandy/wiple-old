import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../../models/user';
import { Platform } from 'ionic-angular';

@Injectable()
export class ApiProvider {

  constructor(
    public auth: AngularFireAuth,
    public database: AngularFireDatabase,
    public plt: Platform,
  ) {}

  signinWithFacebook() {
    if (this.plt.is('mobile')) {
      return this.auth.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider());
    } else {
      return this.auth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
    }
  }

  signupWithEmail(email, password):Promise<any> {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signinWithEmail(email, password):Promise<any> {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signout() {
    this.auth.auth.signOut();
  }

  getAuthState() {
    return this.auth.authState;
  }
  
  getOrCreateUser(user: User): Observable<User> {
    return Observable.create(observer => {
      this.database.list('/users', ref => ref.orderByChild('uid').equalTo(user.uid)).valueChanges().subscribe((users: User[]) => {
        if (users.length > 0) {
          observer.next(users[0]);
          observer.complete();
        } else {
          this.database.list('/users').push(user).then(_ => {
            observer.next(user);
            observer.complete();
          });
        }
      })
    })
  }

  searchUser(email: string) {
    return this.database.list('/users', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
  }

}
