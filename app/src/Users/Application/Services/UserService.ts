import { injectable, inject } from 'inversify';
import { TYPES } from '../../../Bootstrap/IoC/Types';
import { ResultDto } from '../../../Libs/Dto/BodyResultDto';
import { UserDomain } from '../../Domain/Services/UserDomain';
import { UserPostRequest } from '../../Infrastructure/Validation/Request/UserPostRequest';
import { ValidationRequest } from '../../Infrastructure/Validation/ValidationRequest';
import { UserBody } from '../Dto/Body/UserBody';

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.Validation.ValidationRequest)
    private validationRequest: ValidationRequest,
    @inject(TYPES.Repositories.UserRepository)
    private userService: UserDomain
  ) {}

  public async create(userData: UserBody): Promise<ResultDto> {
    const validateInput: UserPostRequest = new UserPostRequest(
      userData.firstName,
      userData.lastName,
      userData.age,
      userData.birthDate
    );

    await this.validationRequest.validate(validateInput);
    const data = await this.userService.createUser(userData);

    return new ResultDto(data);
  }
}