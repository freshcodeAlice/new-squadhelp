const {ROLES, SALT_ROUNDS} = require('../constants');
const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
     {
        firstName: 'Customer',
          lastName: 'Customerovich',
          displayName: 'Cus',
          password: bcrypt.hashSync('Test12345', SALT_ROUNDS),
          email: 'qwerty@customer.com',
          role: ROLES.CUSTOMER
     },
     {
        firstName: 'Creator',
          lastName: 'Creatorovich',
          displayName: 'Cret',
          password: bcrypt.hashSync('Test54321', SALT_ROUNDS),
          email: 'qwerty@creator.com',
          role: ROLES.CREATOR
     }
      ], {});
    },
  };
  