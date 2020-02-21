const assert = require('assert');
const app = require('../../src/app');

describe('\'sink\' service', () => {
  it('registered the service', () => {
    const service = app.service('sink');

    assert.ok(service, 'Registered the service');
  });
});
