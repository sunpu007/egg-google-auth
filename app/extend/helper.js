'use strict';

const base32 = require('thirty-two');
const jssha = require('jssha');
const QRCode = require('qrcode');

/**
 * 数字转字节字符串
 * @param {*} number 数字
 */
const number2ByteText = number => {
  /* eslint-disable */
  const text = new Array(8);
  for (let i = text.length - 1; i >= 0; i--) {
    text[i] = String.fromCharCode(number & 0xFF);
    number >>= 8;
  }
  return text.join('');
};

/**
 * 根据密钥获取验证码
 * 返回字符串是因为验证码有可能以 0 开头
 * @param {*} secretKey 密钥
 * @param {*} time 第几个 30 秒 Date.now() / 1000 / 30
 */
const getTOTP = (secretKey, time) => {
  /* eslint-disable */
  const T = Math.floor(time);
  const hmacSha = new jssha('SHA-1', 'BYTES');
  hmacSha.setHMACKey(base32.decode(secretKey).toString(), 'BYTES');
  const factorByte = number2ByteText(T);
  hmacSha.update(factorByte);
  const hmac_result = hmacSha.getHMAC('BYTES');

  const offset = hmac_result[19].charCodeAt() & 0xf;
  const bin_code = (hmac_result[offset].charCodeAt() & 0x7f) << 24
     | (hmac_result[offset + 1].charCodeAt() & 0xff) << 16
     | (hmac_result[offset + 2].charCodeAt() & 0xff) << 8
     | (hmac_result[offset + 3].charCodeAt() & 0xff);
  let otp = (bin_code % 10 ** 6).toString();
  while (otp.length < 6) {
    otp = '0' + otp;
  }
  return otp;
};

module.exports = {
  /**
   * 生成谷歌身份验证私钥
   */
  generateGoogleSecretKey() {
    const str = Math.random().toString(36);
    return base32.encode(str).toString().substr(0, 16);
  },
  /**
   * 生成身份绑定二维码信息
   * @param {*} secretKey 私钥
   * @param {*} user 用户
   */
  generateGoogleQrCodeText(secretKey, user) {
    let url = `otpauth://totp/${user || this.config.googleAuth.appName}?secret=${secretKey}`;
    if (this.config.googleAuth.appName && this.config.googleAuth.appName.trim() !== '') {
      url += `&issuer=${this.config.googleAuth.appName}`;
    }
    return encodeURI(url);
  },
  /**
   * 获取二维码base64字符串
   * @param {*} secretKey 私钥
   * @param {*} user 用户
   */
  async generateGoogleQrCodeUrl(secretKey, user) {
    return await QRCode.toDataURL(await this.generateGoogleQrCodeText(secretKey, user || this.config.googleAuth.appName));
  },
  /**
   * 获取谷歌验证码
   * @param {*} secretKey 私钥
   */
  generateGoogleCode(secretKey) {
    return getTOTP(secretKey, Date.now() / 1000 / 30);
  },
  /**
   * 获取制定时间片的谷歌验证码
   * @param {*} secretKey 私钥
   * @param {*} time 第几个 30 秒 Date.now() / 1000 / 30
   */
  generateGoogleCodeByTime(secretKey, time) {
    return getTOTP(secretKey, time);
  },
  /**
   * 谷歌验证码校验
   * @param {*} secretKey 私钥
   * @param {*} code 用户输入的 TOTP 验证码
   */
  googleAuthVerify(secretKey, code) {
    const time = Date.now() / 1000 / 30;
    // 判断存在时间偏移量
    const { timeExcursion = 0 } = this.config.googleAuth.options;
    for (let i = -timeExcursion; i <= timeExcursion; i++) {
      const totp = getTOTP(secretKey, time + i);
      if (code === totp) {
        return true;
      }
    }
    return false;
  }
};
