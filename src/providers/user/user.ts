import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { User } from '../../models/user';
import { Storage } from '@ionic/Storage';

@Injectable()
export class UserProvider {

  constructor(
    public api: ApiProvider,
    private storage: Storage,
  ) {
  }

  signupWithEmail(email:string, password:string, displayName:string) {
    return new Promise((resolve, reject) => {
      this.api.signupWithEmail(email, password).then(user => {
        this.api.getOrCreateUser(new User(user.uid, displayName, user.email, '')).subscribe(u => {
          this.storage.set('user', u);
          resolve();
        });
      }).catch(err => {
        reject(err);
      });
    })
  }

  signinWithEmail(email, password) {
    return this.api.signinWithEmail(email, password);
    
  }

  signinWithFacebook() {
    return this.api.signinWithFacebook();
  }

  signout() {
    this.api.signout();
    this.storage.remove('user');
  }

  getCurrentUser():Promise<any> {
    return this.storage.get('user');
  }

  getAuthState() {
    return this.api.getAuthState();
  }

  getOrCreateUser(user) {
    return new Promise((resolve, reject) => {
      this.api.getOrCreateUser(new User(user.uid, user.displayName, user.email, user.photoURL)).subscribe(u => {
        this.storage.set('user', u).then(() => {
          resolve();
        });
      });
    })
  }

  searchUser(email: string) {
    return this.api.searchUser(email).map(users => users[0]);
  }
 
}
