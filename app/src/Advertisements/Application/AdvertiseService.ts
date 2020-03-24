import { AdvertiseInput } from './Dto/AdvertiseInput';
import { AdvertiseResponseDto } from './Dto/AdvertiseResponseDto';
import { validate } from 'class-validator';
import { BaseException } from '../../Libs/Exception/BaseException';
import HttpStatusCode from '../../Libs/CommonResources/HttpStatusCode';
import { injectable, inject } from 'inversify';
import { Advertise } from '../Domain/Entities/Advertise';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { ResultDto } from '../../Libs/Dto/ResultDto';
import { AdvertiseRepository } from '../Domain/Repository/AdvertiseRepository';

@injectable()
export class AdvertiseService {
  constructor(
    @inject(TYPES.Repositories.AdvertiseRepository) private advertiseRepository: AdvertiseRepository
  ) { }

  public async updateAdvertise(advertiseData: AdvertiseInput, advertiseId: number): Promise<AdvertiseResponseDto> {
    const id = advertiseId;
    const newAdvertiseData: AdvertiseInput = { ...advertiseData, id };
    const updateAdvertise: Advertise = await this.setUpdateAdvertise(new Advertise(), newAdvertiseData);
    const response: ResultDto = await this.advertiseRepository.update(updateAdvertise);
    return response;
  }

  private async validateEntity(entity: any) {
    const errors = await validate(entity);
    if (errors.length) {
      const message: string = this.buildErrorMessage(errors);
      throw new BaseException(HttpStatusCode.BAD_REQUEST, message);
    }
  }

  private async setUpdateAdvertise(advertise: Advertise, AdvertiseInput: AdvertiseInput): Promise<Advertise> {
    advertise.setId(AdvertiseInput.id);
    advertise.setTitle(AdvertiseInput.title);
    advertise.setStatusId(AdvertiseInput.statusId);
    advertise.setEntityPackageId(AdvertiseInput.entityPackageId);
    return advertise;
  }

  private buildErrorMessage(errors: object[]): string {
    let message = '';
    for (let error of errors) {
      let descriptionError = '';
      const MIN_KEY = 1;
      const errorKeys = Object.keys(error['constraints']);
      const lastString = errorKeys.length > MIN_KEY ? '\\n' : '';
      for (let errorKey of errorKeys) {
        descriptionError += error['constraints'][errorKey] + lastString;
      }
      message += `${error['property']}: ${descriptionError} \\n`;
    }
    return message;
  }
}
