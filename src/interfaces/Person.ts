export interface IPerson {
  id?: number | null;
  name: string;
  address: string;
  phone: string;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

export class Person implements IPerson {
  public id: null;
  public name: string;
  public address: string;
  public phone: string;
  public createdAt?: Date | null;
  public updatedAt?: Date | null;

  constructor(person: IPerson) {
    this.id = null;
    this.name = "";
    this.address = "";
    this.phone = "";
    this.createdAt = null;
    this.updatedAt = null;
  }
}
