import { inject, injectable } from 'inversify';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { UserRepository } from '../../Domain/Repository/UserRepository';
import { User } from '../Entities/User';
import { UserBody } from '../../Application/Dto/Body/UserBody';

@injectable()
export class UserDomain {
  constructor(
    @inject(TYPES.Repositories.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async createUser(userData: UserBody): Promise<User> {
    return await this.userRepository.createUser(userData);
  }
}