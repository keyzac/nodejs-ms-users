import { AdapterTypes } from './Types/AdapterTypes';
import { RepositoryTypes } from './Types/RepositoryTypes';
import { ServiceTypes } from './Types/ServiceTypes';
import { DomainTypes } from './Types/DomainTypes';
import { HandlerTypes } from './Types/HandlerTypes';
import { ModelTypes } from './Types/ModelTypes';
import { SearchEngineTypes } from './Types/SearchEngineTypes';
import { ValidationTypes } from './Types/ValidationTypes';

const TYPES = {
  Adapters: AdapterTypes,
  Repositories: RepositoryTypes,
  Services: ServiceTypes,
  Domain: DomainTypes,
  Handlers: HandlerTypes,
  Models: ModelTypes,
  Validation: ValidationTypes,
  SearchEngine: SearchEngineTypes,
  ResourceManager: Symbol.for('ResourceManager'),
  Sequelize: Symbol.for('Sequelize')
};

const TAGS = {};

export { TYPES, TAGS };
