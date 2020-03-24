import { ResourceManager } from '../../Libs/ResourceManager/ResourceManager';
import { TYPES } from './Types';
import * as Sequelize from 'sequelize';
import { HomeHandler } from '../../Web/Handler/HomeHandler';
import { Container } from 'inversify';
import { AdvertiseService } from '../../Advertisements/Application/AdvertiseService';
import { AdvertiseRepository } from '../../Advertisements/Domain/Repository/AdvertiseRepository';
import { DbAdvertiseRepository } from '../../Advertisements/Infrastructure/Repository/DbAdvertiseRepository';
import { AdvertiseModel } from '../../Advertisements/Infrastructure/Persistence/Mapping/AdvertiseModel';

const container = new Container();
const commonConfig = new ResourceManager();
const db = commonConfig.getConfig('mysql');
// @ts-ignore
const dbConnection = new Sequelize(
  `${db.dialect}://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`,
  { logging: false, timezone: '-05:00' }
);

/**
 * Commons
 */
container
  .bind<ResourceManager>(TYPES.ResourceManager)
  .to(ResourceManager)
  .inSingletonScope();
container
  .bind<Sequelize.Sequelize>(TYPES.Sequelize)
  .toConstantValue(dbConnection);

/**
 * Handlers
 */
container
  .bind<HomeHandler>(TYPES.Handlers.HomeHandler)
  .to(HomeHandler)
  .inSingletonScope();

/**
 * Services
 */
container.bind<AdvertiseService>(TYPES.Services.AdvertiseService).to(AdvertiseService).inSingletonScope();

/**
 * Repositories
 */
container.bind<AdvertiseRepository>(TYPES.Repositories.AdvertiseRepository).to(DbAdvertiseRepository).inSingletonScope();

/**
 * Models
 */
container.bind<AdvertiseModel>(TYPES.Models.AdvertiseModel).to(AdvertiseModel).inSingletonScope();
export { container };
