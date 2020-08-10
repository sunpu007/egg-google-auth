'use strict';

const mock = require('egg-mock');

describe('test/google-auth.test.js', () => {
  let app;
  before(() => {
    app = mock.app();
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    const ctx = app.mockContext();
    // const code = ctx.helper.generateGoogleCode('GAXGS4T2MJYXO5ZT');
    console.log(ctx.helper.generateGoogleQrCodeData('GAXGS4T2MJYXO5ZT', 'username'));
  });
});
