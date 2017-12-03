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
    return this.api.getOrCreateUser(new User(user.uid, user.displayName, user.email, user.photoURL, user.providerData[0]));
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
    return this.storage.get('userKey').then(userKey => {
      return this.api.getUser(userKey);
    });
  }

  getCurrentUserKey() {
    return this.storage.get('userKey');
  }

  getPartner(partnerKey) {
    return this.api.getPartner(partnerKey);
  }

  searchUser(type: 'email'|'key', value: string) {
    if (type === 'email') {
      return this.api.searchUserByEmail(value);
    } else if (type === 'key') {
      return this.api.searchUserByKey(value);
    }
  }

  checkSingle(userKey) {
    return this.api.checkSingle(userKey);
  }

  breakup(coupleKey: string) {
    let user;
    return this.storage.get('user').then(u => {
      user = u;
      return this.storage.get('userKey')
    }).then(userKey => {
      return this.api.breakup(coupleKey);
    });
  }

  getProfilePic(user: User, size: any=null) {
    if (user) {
      if (user.photoURL) {
        if (size === 'large') {
          if (user.providerData && user.providerData.providerId === 'facebook.com') {
            return "https://graph.facebook.com/" + user.providerData.uid + "/picture?type=large";
          }
        } 
        return user.photoURL;
      } else if (user.gender && user.gender === 'female') {
        return '/assets/imgs/girl.svg';
      } else {
        return '/assets/imgs/boy.svg';
      }
    } else {
      return '/assets/imgs/boy.svg';
    }
  }
}
