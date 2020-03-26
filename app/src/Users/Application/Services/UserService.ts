import { injectable, inject } from 'inversify';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { ResultDto } from '../../../Libs/Dto/BodyResultDto';
import { UserRepository } from '../../Domain/Repository/UserRepository';
import { UserPostRequest } from '../../Infrastructure/Validation/Request/UserPostRequest';
import { ValidationRequest } from '../../Infrastructure/Validation/ValidationRequest';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.Validation.ValidationRequest)
    private validationRequest: ValidationRequest,
    @inject(TYPES.Repositories.UserRepository)
    private userRepository: UserRepository
  ) {}

  public async create(userData: any): Promise<ResultDto> {
    const validateInput: UserPostRequest = new UserPostRequest(
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.birthDate
    );

    await this.validationRequest.validate(validateInput);
    const data = await this.userRepository.createUser(userData);

    return new ResultDto(data);
  }
}