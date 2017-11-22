export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public photoURL: string='',
    public partner: string,
    public firstname: string='',
    public lastname: string='',
  ) {

  }
}