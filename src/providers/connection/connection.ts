import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Storage } from '@ionic/Storage';

@Injectable()
export class ConnectionProvider {

  constructor(
    public api: ApiProvider,
    public storage: Storage,
  ) {

  }

  getInvitations(type:'inviter'|'invitee') {
    return this.storage.get('userKey').then(userKey => {
      return this.api.getInvitations(userKey, type);
    });
  }

  sendInvitation(invitee: string) {
    return this.storage.get('userKey').then(userKey => {
      return this.api.sendInvitation(userKey, invitee);
    });
  }

  removeInvitation(invKey: string) {
    return this.api.removeInvitation(invKey);
  }

  acceptInvitation(partner: string) {
    return this.storage.get('userKey').then(userKey => {
      return this.api.acceptInvitation(userKey, partner);
    });
  }
}
