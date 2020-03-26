import { User } from '../Entities/User';
import { UserBody } from '../../Application/Dto/Body/UserBody';
import { UserDto } from '../../Application/Dto/Response/UserDto';

export interface UserRepository {
  createUser(userData: UserBody): Promise<User>;
  getUsers(): Promise<UserDto[]>;
}
