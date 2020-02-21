// Initializes the `sinkservice` service on path `/sinkservice`
const { Setting } = require('./setting.class');
const createModel = require('../../models/setting.model');
const hooks = require('./setting.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/setting', new Setting(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('setting');

  service.hooks(hooks);
};
