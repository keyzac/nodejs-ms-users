import { AbstractHandler } from '../../Libs/Handler/AbstractHandler';
import { Get } from '../../Libs/Metadata/Routing/Get';

export class HomeHandler extends AbstractHandler {
  @Get('/home')
  public async home(ctx, next) {
    ctx.type = 'json';
    ctx.body = {
      message: 'Estamos acá desde Home!'
    };
  }
}
