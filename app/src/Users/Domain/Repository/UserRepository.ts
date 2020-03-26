import { User } from '../Entities/User';
import {UserModel} from '../../Infrastructure/Persistence/Mapping/UserModel';

export interface UserRepository {
  createUser(userData: any): Promise<UserModel>;
}
