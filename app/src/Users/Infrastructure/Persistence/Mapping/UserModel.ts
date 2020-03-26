import * as Sequelize from 'sequelize';
import BaseSequelizeModel from '../../../../Libs/Model/BaseSequelizeModel';

export class UserModel extends BaseSequelizeModel {
  protected model;

  getModel() {
    this.model = this.sequelize.define(
      'users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'id'
        },
        firstName: { type: Sequelize.STRING, field: 'firstName' },
        lastName: { type: Sequelize.STRING, field: 'lastName' },
        age: { type: Sequelize.INTEGER, field: 'age' },
        birthDate: { type: Sequelize.STRING, field: 'birthDate' }
      },
      {
        tableName: 'users',
        timestamps: false
      }
    );
    return this.model;
  }
}
