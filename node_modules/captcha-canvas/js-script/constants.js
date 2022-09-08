"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCaptchaOptions = exports.defaultDimension = exports.defaultDecoyOptions = exports.defaultTraceOptions = exports.defaultCaptchaOption = exports.defaultDrawCaptchaOption = void 0;
/**
 * Captcha text options to customise text appearance and value.
 * @typedef DrawCaptchaOption
 * @property {string} [text="Random UpperCase string"] Text of captcha
 * @property {hexCode} [color="#32cf7e"] Color of captcha text.
 * @property {font} [font="Sans"] Font of captcha text.
 * @property {boolean} [skew=true] Skew captcha text.
 * @property {array} [colors=[]] Array of hexCode will override color property.
 * @property {number} [rotate=5] Range of angle to rotate text.
 * @property {number} [size=40] Size of captcha text.
 * @property {float} [opacity=1] Opcaity of captcha text.
 */
exports.defaultDrawCaptchaOption = {
    size: 40,
    font: 'Sans',
    skew: true,
    colors: [],
    rotate: 5,
    color: '#32cf7e',
    opacity: 0.8,
};
/**
 * Captcha text options to customise text appearance and value.
 * @typedef SetCaptchaOptions
 * @property {integer} [characters=6] Length of captcha text.
 * @property {string} [text="Random UpperCase string"] Text of captcha
 * @property {hexCode} [color="#32cf7e"] Color of captcha text.
 * @property {font} [font="Sans"] Font of captcha text.
 * @property {boolean} [skew=true] Skew captcha text.
 * @property {array} [colors=[]] Array of hexCode will override color property.
 * @property {number} [rotate=5] Range of angle to rotate text.
 * @property {number} [size=40] Size of captcha text.
 * @property {float} [opacity=1] Opcaity of captcha text.
 */
exports.defaultCaptchaOption = {
    characters: 6,
    size: 40,
    font: 'Sans',
    skew: true,
    colors: [],
    rotate: 5,
    color: '#32cf7e',
    opacity: 0.8,
};
/**
 * @typedef SetTraceOptions
 * @property {hexCode} [color="#32cf7e"] Color of trace line.
 * @property {number} [size=3] Width of trace line.
 * @property {float} [opacity=1] Opacoty of trace line.
 */
exports.defaultTraceOptions = {
    size: 3,
    color: '#32cf7e',
    opacity: 1,
};
/**
 * @typedef SetDecoyOptions
 * @property {hexCode} [color="#646566"] Color of decoy characters.
 * @property {font} [font="Sans"] Font of decoy characters.
 * @property {number} [size=20] Size of decoy characters.
 * @property {float} [opacity=0.8] Opacity of decoy characters.
 * @property {number} [total] Total count of decoy characters.
 */
exports.defaultDecoyOptions = {
    color: '#646566',
    font: 'Sans',
    size: 20,
    opacity: 0.8,
};
/**
 * Customise dimension of captcha image.
 * @typedef SetDimensionOption
 * @property {integer} [height=100] Height of captcha image.
 * @property {integer} [width=300] Width of captcha image.
 */
exports.defaultDimension = {
    height: 100,
    width: 300
};
/**
 * Create captcha options in functions.
 * @typedef CreateCaptchaOptions
 * @property {SetCaptchaOptions} [captcha] Captcha text options to customise text appearance and value.
 * @property {SetDecoyOptions} [decoy]
 * @property {SetTraceOptions} [trace]
 * @property {Image} [background]
 */
exports.CreateCaptchaOptions = {};
