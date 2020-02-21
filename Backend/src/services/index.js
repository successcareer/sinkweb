
const setting = require('./setting/setting.service.js');
const sink = require('./sink/sink.service.js');
const dashboard = require('./dashboard/dashboard.service.js');
const carmake = require('./carmake/carmake.service.js');
const carmodel = require('./carmodel/carmodel.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(setting);
  app.configure(sink);
  app.configure(dashboard);
  app.configure(carmake);
  app.configure(carmodel);
};
