const {ROLES, SALT_ROUNDS} = require('../constants');
const bcrypt = require('bcrypt');


module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
     {
        firstName: 'Customer',
          lastName: 'Customerovich',
          displayName: 'Cus',
          password: await bcrypt.hashSync('Test12345', SALT_ROUNDS),
          email: 'qwerty@customer',
          role: ROLES.CUSTOMER
     },
     {
        firstName: 'Creator',
          lastName: 'Creatorovich',
          displayName: 'Cret',
          password: await bcrypt.hashSync('Test54321', SALT_ROUNDS),
          email: 'qwerty@creator',
          role: ROLES.CREATOR
     }
      ], {});
    },
  };
  