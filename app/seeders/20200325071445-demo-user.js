'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [
          {
              firstName: 'Kevin',
              lastName: 'Yzacupe',
              age: 28,
              birthDate: '1992-01-11',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              firstName: 'David',
              lastName: 'Gomez',
              age: 26,
              birthDate: '1994-04-18',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              firstName: 'Jessie',
              lastName: 'Chacon',
              age: 19,
              birthDate: '2000-10-19',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              firstName: 'Lidia',
              lastName: 'Castañeda',
              age: 64,
              birthDate: '1957-03-28',
              createdAt: new Date(),
              updatedAt: new Date()
          },
          {
              firstName: 'David',
              lastName: 'Jurado',
              age: 63,
              birthDate: '1957-11-02',
              createdAt: new Date(),
              updatedAt: new Date()
          }
      ]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
