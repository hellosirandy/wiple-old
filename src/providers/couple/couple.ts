import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Couple } from '../../models/models';
import { Storage } from '@ionic/Storage';

@Injectable()
export class CoupleProvider {

  constructor(
    public api: ApiProvider,
    public storage: Storage,
  ) {
  }

  getCouple(coupleKey) {
    return this.api.getCouple(coupleKey);
  }

  setCouple(coupleKey) {
    return this.storage.set('couple', coupleKey);
  }

  getCoupleKey() {
    return this.storage.get('couple');
  }

  checkPosition(coupleKey: string, userKey: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const sub = this.getCouple(coupleKey).subscribe((couple: Couple) => {
        sub.unsubscribe();
        if (couple.first === userKey) {
          resolve('first');
        } else if (couple.second === userKey) {
          resolve('second');
        } else {
          reject();
        }
      });
    });
  }

}
