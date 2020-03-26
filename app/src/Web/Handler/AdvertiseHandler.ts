import { Put } from '../../Libs/Metadata/Routing/Put';
import { AbstractHandler } from '../../Libs/Handler/AbstractHandler';
import { inject } from 'inversify';
import { TYPES } from '../../Bootstrap/IoC/Types';
import { AdvertiseService } from '../../Users/Application/AdvertiseService';

export class AdvertiseHandler extends AbstractHandler {
  constructor(
    @inject(TYPES.Services.AdvertiseService) private advertiseService: AdvertiseService
  ) {
    super();
  }

  @Put('/:advertiseId/information')
  public async updateAdvertise(ctx, next) {
    const response: object = await this.advertiseService
      .updateAdvertise(ctx.request.body, Number(ctx.params.advertiseId))
      .catch(e => (ctx.exception = e));
    ctx.type = 'json';
    ctx.body = response;
    next();
  }
}
