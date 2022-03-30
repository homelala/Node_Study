const models = require('../models');

module.exports = () => {
  const option = {
    force: process.env.NODE_ENV === 'test' ? false : true,
  };
  return models.sequelize.sync({ force: force });
};
