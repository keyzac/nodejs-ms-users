import {BaseException} from '../../../Libs/Exception/BaseException';
import HttpStatusCode from '../../../Libs/CommonResources/HttpStatusCode';
import {inject, injectable} from 'inversify';
import {TYPES} from '../../../Bootstrap/IoC/Types';
import {APP_STATUS_CODE} from '../Services/Util/AppStatusCode';
import {UserRepository} from '../../Domain/Repository/UserRepository';
import {UserModel} from '../Persistence/Mapping/UserModel';
import {User} from '../../Domain/Entities/User';

@injectable()
export class DbUserRepository implements UserRepository {
  protected userModel: any;

  constructor(
    @inject(TYPES.Models.UserModel)
    protected model: UserModel
  ) {
    this.userModel = this.model.getModel();
  }

  public async createUser(userData: any): Promise<User> {
    try {
      return await this.userModel.create(userData);
    } catch (error) {
      console.error(error);
      throw new BaseException(
        HttpStatusCode.BAD_REQUEST,
        'Hubo un error al registrar el usuario.',
        APP_STATUS_CODE.errorBadParams
      );
    }
  }
}
