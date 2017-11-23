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

  getAuthState() {
    return this.api.getAuthState();
  }

  getOrCreateUser(user) {
    return this.api.getOrCreateUser(new User(user.uid, user.displayName, user.email, user.photoURL));
  }

  signout() {
    return this.api.signout();
  }

  signinWithEmail(email: string, password: string) {
    return this.api.signinWithEmail(email, password);
  }

  signupWithEmail(email: string, password: string, displayName: string) {
    return this.api.signupWithEmail(email, password).then(user => {
      return user.updateProfile({displayName: displayName});
    })
  }

  signinWithFacebook() {
    return this.api.signinWithFacebook();
  }

  getCurrentUser() {
    return this.storage.get('user');
  }

  getCurrentUserKey() {
    return this.storage.get('userKey');
  }

  searchUser(type: 'key' | 'email', value: string) {
    if (type === 'email') {
      return this.api.searchUserByEmail(value).map(users => users[0]);
    } else {
      return this.api.searchUserByKey(value);
    }
  }

  getPartner(key: string) {
    return this.api.getPartner(key);
  }

  breakup(firstKey: string, secondKey: string) {
    return this.api.breakup(firstKey, secondKey);
  }

  refreshUser(userKey: string) {
    return new Promise((resolve, reject) => {
      const subscription = this.api.refreshUser(userKey).subscribe(user => {
        subscription.unsubscribe();
        this.storage.set('user', user).then(_ => {
          resolve();
        });
      })
    });
  }
}
