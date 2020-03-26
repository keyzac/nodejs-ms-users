import { IsString, IsInt } from 'class-validator';
import { messageType } from './Validation/messages';

export class User {
  @IsInt({
    message: messageType.number
  })
  private id: number;

  @IsString({
    message: messageType.string
  })
  private firstName: string;

  @IsString({
    message: messageType.string
  })
  private lastName: string;

  @IsInt({
    message: messageType.number
  })
  private age: number;

  @IsString({
    message: messageType.string
  })
  private birthDate: string;

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public setLastName(lastName: string) {
    this.lastName = lastName;
  }

  public getAge(): number {
    return this.age;
  }

  public setAge(age: number) {
    this.age = age;
  }

  public getBirthDate(): String {
    return this.birthDate;
  }

  public setBirthDate(birthDate: string) {
    this.birthDate = birthDate;
  }
}
