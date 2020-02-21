

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      async context => {
        let count = await context.service.options.Model.count({})
        context.result.length = count
      }
    ],
    get: [
      async context => {
        let services = await context.app.service('setting').find({})
        context.result.settings = services.data

        let carmakes = await context.app.service('carmake').find({})
        context.result.carmakes = carmakes
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
