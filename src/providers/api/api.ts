import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Platform } from 'ionic-angular';
import { Storage } from '@ionic/Storage';

@Injectable()
export class ApiProvider {

  constructor(
    public auth: AngularFireAuth,
    public database: AngularFireDatabase,
    public plt: Platform,
    public storage: Storage,
  ) {}

  getAuthState() {
    return this.auth.authState;
  }

  getOrCreateUser(user):Promise<any> {
    return new Promise((resolve, reject) => {
      const subscription = this.database.list('/users', ref => ref.orderByChild('uid').equalTo(user.uid)).snapshotChanges().subscribe(users => {
        if (users.length > 0) {
          this.storage.set('user', users[0].payload.val()).then(() => {
            return this.storage.set('userKey', users[0].key);
          }).then(() => {
            resolve(users[0].payload.val());
          })
        } else {
          const ref = this.database.list('/users').push(user)
          ref.then(() => {
            this.storage.set('user', user).then(() => {
              return this.storage.set('userKey', ref.key);
            }).then(() => {
              resolve(user);
            })
          });
        }
        subscription.unsubscribe();
      });
    })
  }

  signout() {
    return this.auth.auth.signOut();
  }

  signinWithEmail(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  signupWithEmail(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  signinWithFacebook() {
    if (this.plt.is('mobile')) {
      return this.auth.auth.signInWithRedirect( new firebase.auth.FacebookAuthProvider());
    } else {
      return this.auth.auth.signInWithPopup( new firebase.auth.FacebookAuthProvider());
    }
  }

  getInvitations(key: string) {
    const obj = this.database.list(`/users/${key}/invitations`).snapshotChanges();
    return obj;
  }

  getPartner(key: string) {
    const obj = this.database.object(`/users/${key}/partner`).valueChanges();
    return obj;
  }

  searchUserByEmail(email: string) {
    return this.database.list('/users', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges();
  }

  searchUserByKey(key: string) {
    return this.database.object(`/users/${key}`).snapshotChanges();
  }

  createInvitation(userKey: string, invitation) {
    return this.database.list(`/users/${userKey}/invitations`).push(invitation);
  }

  removeInvitation(inviter: string, invitee: string) {
    return new Promise((resolve, reject) => {
      const subscription = this.database.list(`/users/${inviter}/invitations`, ref => ref.orderByChild('invitee').equalTo(invitee)).snapshotChanges().subscribe(invs => {
        const key = invs[0].key;
        subscription.unsubscribe();
        this.database.list(`/users/${inviter}/invitations`).remove(key).then(_ => {
          const subscription = this.database.list(`/users/${invitee}/invitations`, ref => ref.orderByChild('inviter').equalTo(inviter)).snapshotChanges().subscribe(invs => {
            subscription.unsubscribe();
            const key = invs[0].key;
            this.database.list(`/users/${invitee}/invitations`).remove(key).then(_ => {
              resolve();
            })
          })
        });
      })
    });
  }

  acceptInvitation(firstKey: string, secondKey: string) {
    return this.database.object(`/users/${firstKey}`).update({partner: secondKey}).then(_ => {
      return this.database.object(`/users/${secondKey}`).update({partner: firstKey})
    })
  }

  breakup(firstKey: string, secondKey: string) {
    return this.database.object(`/users/${firstKey}/partner`).remove().then(_1 => {
      return this.database.object(`/users/${secondKey}/partner`).remove();
    });
  }

  refreshUser(userKey: string) {
    return this.database.object(`/users/${userKey}`).valueChanges();
  }
}
