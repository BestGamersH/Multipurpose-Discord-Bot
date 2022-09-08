"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Captcha = void 0;
const skia_canvas_1 = require("skia-canvas");
const constants_1 = require("./constants");
const util_1 = require("./util");
/**
 * Captcha Generator
 */
class Captcha {
    /**
     * Start captcha image creation.
     * @param {number} [width] Width of captcha image.
     * @param {number} [height] Height of captcha image.
     * @param {number} [characters] Size of captcha text.
     * @constructor
     */
    constructor(width = constants_1.defaultDimension.width, height = constants_1.defaultDimension.height, characters = constants_1.defaultCaptchaOption.characters) {
        this._height = height;
        this._width = width;
        this._captcha = constants_1.defaultCaptchaOption;
        this._captcha.characters = characters;
        this._trace = constants_1.defaultTraceOptions;
        this._decoy = constants_1.defaultDecoyOptions;
        const canvas = new skia_canvas_1.Canvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.lineJoin = 'miter';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        this._canvas = canvas;
        this._ctx = ctx;
        this.async = true;
        this._coordinates = [];
        this._canvas.gpu = false;
    }
    /**
     * Get Captcha text.
     * @returns {string} Get captcha text.
     */
    get text() {
        return this._captcha.text || "";
    }
    /**
     * Get png image of captcha.
     * @returns {Buffer | Promise<Buffer>} Get png image of captcha created.
     */
    get png() {
        if (this.async) {
            return this._canvas.toBuffer('png');
        }
        else {
            return this._canvas.toBufferSync('png');
        }
    }
    /**
     * Draw image on your captcha.
     * @param {Image} image Choose image you want to add.
     * @returns {Captcha}
     */
    drawImage(image) {
        this._ctx.drawImage(image, 0, 0, this._width, this._height);
        return this;
    }
    /**
     * Add decoy on your captcha image.
     * @param {SetDecoyOptions} [decoyOption] Decoy option you want to customise
     * @returns {Captcha}
     */
    addDecoy(decoyOption = {}) {
        const option = { ...this._decoy, ...decoyOption };
        if (!option.total)
            option.total = Math.floor(this._width * this._height / 10000);
        const decoyText = (0, util_1.randomText)(option.total);
        this._ctx.font = `${option.size}px ${option.font}`;
        this._ctx.globalAlpha = option.opacity;
        this._ctx.fillStyle = option.color;
        for (const element of decoyText) {
            this._ctx.fillText(element, (0, util_1.getRandom)(30, this._width - 30), (0, util_1.getRandom)(30, this._height - 30));
        }
        return this;
    }
    /**
     * Draw trace line over your captcha.
     *
     * Note: If you want to use custom text or change size of captcha text then drawCaptcha before drawTrace.
     * @param {SetTraceOptions} [traceOption]
     * @returns {Captcha}
     */
    drawTrace(traceOption = {}) {
        const option = { ...this._trace, ...traceOption };
        if (!this._coordinates[0])
            this._coordinates = (0, util_1.getRandomCoordinate)(this._height, this._width, this._captcha.characters || 6);
        const coordinates = this._coordinates;
        this._ctx.strokeStyle = option.color;
        this._ctx.globalAlpha = option.opacity;
        this._ctx.beginPath();
        this._ctx.moveTo(coordinates[0][0], coordinates[0][1]);
        this._ctx.lineWidth = option.size;
        for (let i = 1; i < coordinates.length; i++) {
            this._ctx.lineTo(coordinates[i][0], coordinates[i][1]);
        }
        this._ctx.stroke();
        return this;
    }
    /**
     * Draw captcha text on captcha image.
     * @param {DrawCaptchaOption} [captchaOption]
     * @returns {Captcha}
     */
    drawCaptcha(captchaOption = {}) {
        var _a;
        const option = { ...this._captcha, ...captchaOption };
        if (captchaOption.text)
            option.text = captchaOption.text;
        if (!option.text)
            option.text = (0, util_1.randomText)(option.characters);
        if (option.text.length != option.characters) {
            if (captchaOption.text) {
                throw new Error("Size of text and no. of characters is not matching.");
            }
            else {
                option.text = (0, util_1.randomText)(option.characters);
            }
        }
        this._captcha = option;
        if (!this._coordinates[0])
            this._coordinates = (0, util_1.getRandomCoordinate)(this._height, this._width, option.characters || 6);
        const coordinates = this._coordinates;
        this._ctx.font = `${option.size}px ${option.font}`;
        this._ctx.globalAlpha = option.opacity;
        this._ctx.fillStyle = option.color;
        for (let n = 0; n < coordinates.length; n++) {
            this._ctx.save();
            this._ctx.translate(coordinates[n][0], coordinates[n][1]);
            if (option.skew) {
                this._ctx.transform(1, Math.random(), (0, util_1.getRandom)(20) / 100, 1, 0, 0);
            }
            if (option.rotate && option.rotate > 0) {
                this._ctx.rotate((0, util_1.getRandom)(-option.rotate, option.rotate) * Math.PI / 180);
            }
            if (option.colors && ((_a = option.colors) === null || _a === void 0 ? void 0 : _a.length) > 2) {
                this._ctx.fillStyle = option.colors[(0, util_1.getRandom)(option.colors.length - 1)];
            }
            this._ctx.fillText(option.text[n], 0, 0);
            this._ctx.restore();
        }
        return this;
    }
}
exports.Captcha = Captcha;
