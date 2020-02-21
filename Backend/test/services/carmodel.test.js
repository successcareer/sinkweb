const assert = require('assert');
const app = require('../../src/app');

describe('\'carmodel\' service', () => {
  it('registered the service', () => {
    const service = app.service('carmodel');

    assert.ok(service, 'Registered the service');
  });
});
