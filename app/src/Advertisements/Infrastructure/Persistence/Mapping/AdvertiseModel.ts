import * as Sequelize from 'sequelize';
import BaseSequelizeModel from '../../../../Libs/Model/BaseSequelizeModel';

export class AdvertiseModel extends BaseSequelizeModel {
  protected model;
  protected userModel;

  getModel() {
    this.model = this.sequelize.define(
      'advertise',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'IdAviso'
        },
        title: { type: Sequelize.STRING, field: 'TituloAviso' },
        statusId: { type: Sequelize.INTEGER, field: 'EstadoAviso' },
        entityPackageId: { type: Sequelize.INTEGER, field: 'IdPaqueteEnte' }
      },
      {
        tableName: 'npc_aviso',
        timestamps: false
      }
    );
    return this.model;
  }
}
