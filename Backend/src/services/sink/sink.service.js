// Initializes the `sink` service on path `/sink`
const { Sink } = require('./sink.class');
const createModel = require('../../models/sink.model');
const hooks = require('./sink.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/sink', new Sink(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('sink');

  service.hooks(hooks);
};
