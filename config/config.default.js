'use strict';

/**
 * egg-google-auth default config
 * @member Config#googleAuth
 * @property {String} SOME_KEY - some description
 */
exports.googleAuth = {
  appName: 'Google Auth',
  options: {
    // 时间偏移量，用于避免用户网络延时引起的校验问题。默认：0
    timeExcursion: 0,
  },
};
