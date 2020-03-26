import { AdvertiseRepository } from '../../Domain/Repository/AdvertiseRepository';
import { Advertise } from '../../Domain/Entities/Advertise';
import { AdvertiseResponseDto } from '../../Application/Dto/AdvertiseResponseDto';
import { BaseException } from '../../../Libs/Exception/BaseException';
import HttpStatusCode from '../../../Libs/CommonResources/HttpStatusCode';
import { ResultDto } from '../../../Libs/Dto/BodyResultDto';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { AdvertiseModel } from '../Persistence/Mapping/AdvertiseModel';

@injectable()
export class DbAdvertiseRepository implements AdvertiseRepository {
  protected advertiseModel: any;

  constructor(@inject(TYPES.Models.AdvertiseModel) protected model: AdvertiseModel) {
    this.advertiseModel = this.model.getModel();
  }

  public async update(advertise: Advertise): Promise<any> {
    try {
      await this.advertiseModel.update(advertise, {
        where: {
          id: advertise.getId()
        }
      });
      const dto = new ResultDto(
        advertise,
        1000,
        'Se actualizó la publicación correctamente.'
      );
      return dto.data;
    } catch (error) {
      console.error(error);
      throw new BaseException(
        HttpStatusCode.BAD_REQUEST,
        'No se actualizó la publicación.'
      );
    }
  }
}
