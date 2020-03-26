import { inject } from 'inversify';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { AbstractHandler } from '../../Libs/Handler/AbstractHandler';
import { Post } from '../../Libs/Metadata/Routing/Post';
import { UserService } from '../../Users/Application/Services/UserService';
import { ResultDto } from '../../Libs/Dto/BodyResultDto';

export class UserHandler extends AbstractHandler {
  constructor(
    @inject(TYPES.Services.UserService)
    private userService: UserService
  ) {
    super();
  }

  @Post('/create')
  public async createUser(ctx, next) {
    const response: ResultDto = await this.userService
      .create(ctx.request.body)
      .catch(e => (ctx.exception = e));
    ctx.type = 'json';
    ctx.body = response.body;
    next();
  }
}
