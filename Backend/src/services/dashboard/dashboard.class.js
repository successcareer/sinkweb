/* eslint-disable no-unused-vars */
var moment = require('moment')
exports.Dashboard = class Dashboard {
  constructor (options) {
    this.options = options || {};
    
  }

  async find (params) {
    var offset = moment().utcOffset();
    let sinkService = this.options.app.service('sink')
    let start = moment(params.query.start)
    let end = moment(params.query.end).add(1, 'days')
    let date_array = []
    let count_array = []
    for(var m = moment(start); m.isBefore(end); m.add(1, 'days')) {

      var n = moment(m)
      n.add(1, 'days')
      let query = {
        $and: [
          {createdAt: { $gte: new Date(m.format('YYYY/MM/DD')) }},
          {createdAt: { $lt: new Date(n.format('YYYY/MM/DD')) }}
        ]
      }
      let count = await sinkService.Model.count(query)
      count_array.push(count)
      date_array.push(m.format('MM/DD'))
    }
    let response = {
      data: count_array,
      label: date_array
    }
    return response
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
