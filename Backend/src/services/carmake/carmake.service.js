// Initializes the `carmake` service on path `/carmake`
const { Carmake } = require('./carmake.class');
const createModel = require('../../models/carmake.model');
const hooks = require('./carmake.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app)
  };

  // Initialize our service with any options it requires
  app.use('/carmake', new Carmake(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('carmake');

  service.hooks(hooks);
};
