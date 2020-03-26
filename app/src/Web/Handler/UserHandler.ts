import { inject } from 'inversify';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { AbstractHandler } from '../../Libs/Handler/AbstractHandler';
import { Post } from '../../Libs/Metadata/Routing/Post';
import { Get } from '../../Libs/Metadata/Routing/Get';
import { UserService } from '../../Users/Application/Services/UserService';
import { ResultDto } from '../../Libs/Dto/BodyResultDto';

export class UserHandler extends AbstractHandler {
  constructor(
    @inject(TYPES.Services.UserService)
    private userService: UserService
  ) {
    super();
  }

  @Post('/creacliente')
  public async createUser(ctx, next) {
    const response: ResultDto = await this.userService
      .create(ctx.request.body)
      .catch(e => (ctx.exception = e));
    ctx.type = 'json';
    ctx.body = response.body;
    next();
  }

  @Get('/kpideclientes')
  public async getKpiUsers(ctx, next) {
    const response: ResultDto = await this.userService
      .getKpiUsers()
      .catch(e => (ctx.exception = e));
    ctx.type = 'json';
    ctx.body = response.body;
    next();
  }

  @Get('/listclientes')
  public async getUsers(ctx, next) {
    const response: ResultDto = await this.userService
      .getUsers()
      .catch(e => (ctx.exception = e));
    ctx.type = 'json';
    ctx.body = response.body;
    next();
  }
}
