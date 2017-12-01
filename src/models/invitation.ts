export class Invitation {
  constructor(
    public inviter: string,
    public invitee: string,
    // public status: 'pending' | 'declined' | 'accepted'='pending'
  ) {

  }
}