import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Invitation } from '../../models/invitation';

@Injectable()
export class ConnectionProvider {

  constructor(
    public api: ApiProvider,
  ) {

  }

  searchUser() {

  }

  sendInvitation(inviter: string, invitee: string) {
    const invitation = new Invitation(inviter, invitee, 'pending');
    return this.api.createInvitation(invitee, invitation).then(() => {
      return this.api.createInvitation(inviter, invitation);
    });
  }

  getInvitations(userKey: string) {
    return this.api.getInvitations(userKey);
  }

  removeInvitation(inviter: string, invitee: string) {
    return this.api.removeInvitation(inviter, invitee);
  }

  acceptInvitation(firstKey: string, secondKey: string) {
    return this.api.acceptInvitation(firstKey, secondKey);
  }
}
