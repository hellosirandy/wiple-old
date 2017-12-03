export class User {
  constructor(
    public uid: string,
    public displayName: string,
    public email: string,
    public photoURL: string,
    public providerData: any,
    public couple: string='',
    public firstname: string='',
    public lastname: string='',
    public invitation: any=null,
    public gender: string=null,
  ) {

  }
}