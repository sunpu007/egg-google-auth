# egg-google-auth

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-google-auth.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-google-auth
[travis-image]: https://img.shields.io/travis/eggjs/egg-google-auth.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-google-auth
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-google-auth.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-google-auth?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-google-auth.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-google-auth
[snyk-image]: https://snyk.io/test/npm/egg-google-auth/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-google-auth
[download-image]: https://img.shields.io/npm/dm/egg-google-auth.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-google-auth

<!--
Description here.
-->

## Install

```bash
$ npm i egg-google-auth --save
or
$ yarn add egg-google-auth
```

## Usage

```js
// {app_root}/config/plugin.js
exports.googleAuth = {
  enable: true,
  package: 'egg-google-auth',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.googleAuth = {
  appName: 'Application name',
  options: {
    // Time offset, used to avoid verification problems caused by user network delay. Default: 0
    timeExcursion: 0,
  },
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

```js
// Generate Google authentication private key
ctx.helper.generateGoogleSecretKey()

// Generate identity binding QR code information
ctx.helper.generateGoogleQrCodeText('your secretKey', 'your user')

// Get the base64 string of the QR code
ctx.helper.generateGoogleQrCodeUrl('your secretKey', 'your user')

// Get Google verification code
ctx.helper.generateGoogleCode('your secretKey')

// Get the Google verification code for the specified time slice
ctx.helper.generateGoogleCodeByTime('your secretKey', 'The first 30 seconds Date.now() / 1000 / 30')

// Google verification code verification
ctx.helper.googleAuthVerify('your secretKey', 'TOTP verification code entered by the user')
```

## WeChat applet version of the client

[weapp-google-auth](https://github.com/sunpu007/weapp-google-auth)

## Questions & Suggestions

Please open an issue [here](https://github.com/sunpu007/egg-google-auth/issues).

## License

[MIT](LICENSE)
