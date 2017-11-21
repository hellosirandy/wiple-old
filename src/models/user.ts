export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public partner: string,
    public photoURL: string='',
    public firstname: string='',
    public lastname: string='',
  ) {

  }
}