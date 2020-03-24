import { IsString, IsInt, IsOptional } from 'class-validator';
import { messageType } from './Validation/messages';

export class Advertise {
  private id: number;

  @IsOptional()
  @IsString({
    message: messageType.string
  })
  private title: string;

  @IsInt({
    message: messageType.number
  })
  private statusId: number;

  @IsInt({
    message: messageType.number
  })
  private entityPackageId: number;

  public getId() {
    return this.id;
  }

  public setId(id: number) {
    this.id = id;
  }

  public getTitle() {
    return this.title;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public getStatusId() {
    return this.statusId;
  }

  public setStatusId(statusId: number) {
    this.statusId = statusId;
  }

  public getEntityPackageId() {
    return this.entityPackageId;
  }

  public setEntityPackageId(entityPackageId: number) {
    this.entityPackageId = entityPackageId;
  }
}
