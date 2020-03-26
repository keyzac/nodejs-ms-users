import { BaseException } from '../../../Libs/Exception/BaseException';
import HttpStatusCode from '../../../Libs/CommonResources/HttpStatusCode';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { APP_STATUS_CODE } from '../Services/Util/AppStatusCode';
import { UserRepository } from '../../Domain/Repository/UserRepository';
import { UserModel } from '../Persistence/Mapping/UserModel';
import { User } from '../../Domain/Entities/User';
import { UserBody } from '../../Application/Dto/Body/UserBody';
import { UserDto } from '../../Application/Dto/Response/UserDto';

@injectable()
export class DbUserRepository implements UserRepository {
  protected userModel: any;

  constructor(
    @inject(TYPES.Models.UserModel)
    protected model: UserModel
  ) {
    this.userModel = this.model.getModel();
  }

  public async createUser(userData: UserBody): Promise<User> {
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

  public async getUsers(): Promise<UserDto[]> {
    try {
      return await this.userModel.findAll({
        logging: console.log
      });
    } catch (error) {
      console.error(error);
      throw new BaseException(
        HttpStatusCode.BAD_REQUEST,
        'Hubo un error al retornar los usuarios',
        APP_STATUS_CODE.errorNotFound
      );
    }
  }
}
