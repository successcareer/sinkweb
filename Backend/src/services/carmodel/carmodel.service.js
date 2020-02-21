// Initializes the `carmodel` service on path `/carmodel`
const { Carmodel } = require('./carmodel.class');
const createModel = require('../../models/carmodel.model');
const hooks = require('./carmodel.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app)
  };

  // Initialize our service with any options it requires
  app.use('/carmodel', new Carmodel(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('carmodel');

  service.hooks(hooks);
};
