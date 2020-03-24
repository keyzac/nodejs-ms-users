import { AdapterTypes } from './Types/AdapterTypes';
import { RepositoryTypes } from './Types/RepositoryTypes';
import { ServiceTypes } from './Types/ServiceTypes';
import { HandlerTypes } from './Types/HandlerTypes';
import { ModelTypes } from './Types/ModelTypes';
import { SearchEngineTypes } from './Types/SearchEngineTypes';

const TYPES = {
  Adapters: AdapterTypes,
  Repositories: RepositoryTypes,
  Services: ServiceTypes,
  Handlers: HandlerTypes,
  Models: ModelTypes,
  SearchEngine: SearchEngineTypes,
  ResourceManager: Symbol.for('ResourceManager'),
  Sequelize: Symbol.for('Sequelize')
};

const TAGS = {};

export { TYPES, TAGS };
