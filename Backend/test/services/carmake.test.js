const assert = require('assert');
const app = require('../../src/app');

describe('\'carmake\' service', () => {
  it('registered the service', () => {
    const service = app.service('carmake');

    assert.ok(service, 'Registered the service');
  });
});
