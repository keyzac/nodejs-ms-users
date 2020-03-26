import { User } from '../Entities/User';
import { UserBody } from '../../Application/Dto/Body/UserBody';

export interface UserRepository {
  createUser(userData: UserBody): Promise<User>;
}
