import { inject, injectable } from 'inversify';
import { mean, std } from 'mathjs';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { UserRepository } from '../../Domain/Repository/UserRepository';
import { User } from '../Entities/User';
import { UserBody } from '../../Application/Dto/Body/UserBody';
import { KpiUsers } from '../../Application/Dto/Response/KpiUsers';
import { UserDto } from '../../Application/Dto/Response/UserDto';

@injectable()
export class UserDomain {
  constructor(
    @inject(TYPES.Repositories.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async createUser(userData: UserBody): Promise<User> {
    return await this.userRepository.createUser(userData);
  }

  public async getKpiUsers(): Promise<KpiUsers> {
    let standardDeviation: number;
    let average: number;
    let users: UserDto[];

    users = await this.userRepository.getUsers();

    let usersAge = users.map((user: UserDto) => {
      return user.age;
    });

    standardDeviation = std(usersAge);
    average = mean(usersAge);

    return {
      averageAge: average,
      standardDeviationAge: standardDeviation
    };
  }

  public async getUsers(): Promise<UserDto[]> {
    let users: UserDto[];

    users = await this.userRepository.getUsers();

    users.map((user: UserDto) => {
      user['dataValues']['deathDate'] = '2070-04-15';
    });

    return users;
  }
}