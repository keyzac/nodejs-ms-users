import { inject, injectable } from 'inversify';
import * as moment from 'moment'
import { mean, std } from 'mathjs';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { UserRepository } from '../../Domain/Repository/UserRepository';
import { User } from '../Entities/User';
import { UserBody } from '../../Application/Dto/Body/UserBody';
import { KpiUsers } from '../../Application/Dto/Response/KpiUsers';
import { UserDto } from '../../Application/Dto/Response/UserDto';

@injectable()
export class UserDomain {
  MORTALITY_AGE: number = 75;

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

    let usersAge = users.map((user: UserDto) => user.age);

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

    users.map(async (user: UserDto) => {
      user['dataValues']['probablyDeathDate'] = await this.calculateDeathDate(user.birthDate);
    });

    return users;
  }

  public calculateDeathDate(birthDate: string): string {
    let deathDate: moment.Moment;
    let probablyDeathDate: string;

    deathDate = moment(birthDate, 'YYYY-MM-DD');
    probablyDeathDate = deathDate.add(this.MORTALITY_AGE, 'years').format('YYYY-MM-DD');

    return probablyDeathDate;
  }
}