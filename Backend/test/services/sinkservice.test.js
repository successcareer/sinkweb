const assert = require('assert');
const app = require('../../src/app');

describe('\'setting\' service', () => {
  it('registered the service', () => {
    const service = app.service('setting');

    assert.ok(service, 'Registered the service');
  });
});
