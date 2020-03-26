import { User } from '../Entities/User';

export interface UserRepository {
  createUser(userData: any): Promise<User>;
}
