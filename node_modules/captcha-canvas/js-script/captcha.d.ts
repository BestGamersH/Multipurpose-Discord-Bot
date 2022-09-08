/// <reference types="node" />
import { Canvas, CanvasRenderingContext2D, Image } from "skia-canvas";
import { SetCaptchaOption, SetDecoyOption, SetTraceOption, DrawCaptchaOption } from "./constants";
/**
 * Captcha Generator
 */
export declare class Captcha {
    protected _height: number;
    protected _width: number;
    protected _captcha: SetCaptchaOption;
    protected _trace: SetTraceOption;
    protected _decoy: SetDecoyOption;
    protected _canvas: Canvas;
    protected _ctx: CanvasRenderingContext2D;
    protected _coordinates: number[][];
    async: boolean;
    /**
     * Start captcha image creation.
     * @param {number} [width] Width of captcha image.
     * @param {number} [height] Height of captcha image.
     * @param {number} [characters] Size of captcha text.
     * @constructor
     */
    constructor(width?: number, height?: number, characters?: number);
    /**
     * Get Captcha text.
     * @returns {string} Get captcha text.
     */
    get text(): string;
    /**
     * Get png image of captcha.
     * @returns {Buffer | Promise<Buffer>} Get png image of captcha created.
     */
    get png(): Buffer | Promise<Buffer>;
    /**
     * Draw image on your captcha.
     * @param {Image} image Choose image you want to add.
     * @returns {Captcha}
     */
    drawImage(image: Image): Captcha;
    /**
     * Add decoy on your captcha image.
     * @param {SetDecoyOptions} [decoyOption] Decoy option you want to customise
     * @returns {Captcha}
     */
    addDecoy(decoyOption?: SetDecoyOption): Captcha;
    /**
     * Draw trace line over your captcha.
     *
     * Note: If you want to use custom text or change size of captcha text then drawCaptcha before drawTrace.
     * @param {SetTraceOptions} [traceOption]
     * @returns {Captcha}
     */
    drawTrace(traceOption?: SetTraceOption): Captcha;
    /**
     * Draw captcha text on captcha image.
     * @param {DrawCaptchaOption} [captchaOption]
     * @returns {Captcha}
     */
    drawCaptcha(captchaOption?: DrawCaptchaOption): Captcha;
}
