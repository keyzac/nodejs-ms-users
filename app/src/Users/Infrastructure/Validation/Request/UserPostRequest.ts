import {IsInt, IsString} from 'class-validator';
import { messageType } from '../../../Domain/Entities/Validation/messages';

export class UserPostRequest {
  @IsString({
    message: messageType.string
  })
  private readonly firstNameUser: string;

  @IsString({
    message: messageType.string
  })
  private readonly lastNameUser: string;

  @IsInt({
    message: messageType.number
  })
  private readonly ageUser: number;

  @IsString({
    message: messageType.string
  })
  private readonly birthDateUser: string;

  constructor(
    firstNameUser: string,
    lastNameUser: string,
    ageUser: number,
    birthDateUser?: string
  ) {
    this.firstNameUser = firstNameUser;
    this.lastNameUser = lastNameUser;
    this.ageUser = ageUser;
    this.birthDateUser = birthDateUser;
  }

  public getFirstNameUser(): string {
    return this.firstNameUser;
  }

  public getLastNameUser(): string {
    return this.lastNameUser;
  }

  public getAgeUser(): number {
    return this.ageUser;
  }

  public getBirthDateUser(): string {
    return this.birthDateUser;
  }
}
