import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';

@Injectable()
export class CoupleProvider {

  constructor(
    public api: ApiProvider
  ) {
  }

  getCouple(coupleKey) {
    return this.api.getCouple(coupleKey);
  }

}
