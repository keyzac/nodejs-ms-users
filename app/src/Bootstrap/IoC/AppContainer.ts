import { ResourceManager } from '../../Libs/ResourceManager/ResourceManager';
import { TYPES } from './Types';
import { Sequelize } from 'sequelize';
import { Container } from 'inversify';
import { HomeHandler } from '../../Web/Handler/HomeHandler';
import { ValidationRequest } from '../../Users/Infrastructure/Validation/ValidationRequest';
import { AdvertiseService } from '../../Users/Application/AdvertiseService';
import { AdvertiseModel } from '../../Users/Infrastructure/Persistence/Mapping/AdvertiseModel';
import { AdvertiseRepository } from '../../Users/Domain/Repository/AdvertiseRepository';
import { DbAdvertiseRepository } from '../../Users/Infrastructure/Repository/DbAdvertiseRepository';
import { UserService } from '../../Users/Application/Services/UserService';
import { UserModel } from '../../Users/Infrastructure/Persistence/Mapping/UserModel';
import { UserRepository } from '../../Users/Domain/Repository/UserRepository';
import { DbUserRepository } from '../../Users/Infrastructure/Repository/DbUserRepository';

const container = new Container();
const commonConfig = new ResourceManager();
const db = commonConfig.getConfig('development');
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
  .bind<Sequelize>(TYPES.Sequelize)
  .toConstantValue(dbConnection);
container
  .bind<ValidationRequest>(TYPES.Validation.ValidationRequest)
  .to(ValidationRequest)
  .inSingletonScope();

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
container
  .bind<UserService>(TYPES.Services.UserService)
  .to(UserService)
  .inSingletonScope();

/**
 * Repositories
 */
container.bind<AdvertiseRepository>(TYPES.Repositories.AdvertiseRepository).to(DbAdvertiseRepository).inSingletonScope();
container
  .bind<UserRepository>(TYPES.Repositories.UserRepository)
  .to(DbUserRepository)
  .inSingletonScope();

/**
 * Models
 */
container.bind<AdvertiseModel>(TYPES.Models.AdvertiseModel).to(AdvertiseModel).inSingletonScope();
container
  .bind<UserModel>(TYPES.Models.UserModel)
  .to(UserModel)
  .inSingletonScope();

export { container };
