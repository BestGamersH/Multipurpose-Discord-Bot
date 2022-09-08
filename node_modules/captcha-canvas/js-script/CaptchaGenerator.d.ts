/// <reference types="node" />
import { Image } from "skia-canvas";
import { SetCaptchaOption, SetDecoyOption, SetTraceOption } from "./constants";
/**
 * Captcha generator class.
 */
export declare class CaptchaGenerator {
    private height;
    private width;
    private captcha;
    private trace;
    private decoy;
    private background?;
    /**
     * Initatiates the creation of captcha image generation.
     * @example const captcha = new CaptchaGenerator({height: 200, width: 600});
     * @param {object} [options] Options for constructor.
     * @param {integer} [options.height=100] Height of captcha image.
     * @param {integer} [options.width=300] Width of captcha image.
     * @since 2.0.0
     */
    constructor(options?: {
        height: number;
        width: number;
    });
    /**
     * Get the text of captcha.
     * @type {string}
     * @since 2.0.3
     */
    get text(): string | undefined;
    /**
     * set dimension for your captcha image
     * @param {integer} height Height of captcha image.
     * @param {integer} width Width of captcha image.
     * @example
     * const { CaptchaGenerator } = require("captcha-canvas");
     * const fs = require("fs")
     * const captcha = new CaptchaGenerator();
     * captcha.setDimension(200, 600);
     * const buffer = await captcha.generate() //generate image
     *
     * fs.writeFileSync("image.png", buffer)
     * @since 2.0.0
     */
    setDimension(height: number, width: number): CaptchaGenerator;
    /**
     * Set background for captcha image.
     * @param {buffer} image Buffer/url/path of image.
     * @example
     * const { CaptchaGenerator } = require("captcha-canvas");
     * const fs = require("fs")
     * const captcha = new CaptchaGenerator();
     * captcha.setBackground("./path/toFile");
     * const buffer = await captcha.generate() //generate image
     *
     * fs.writeFileSync("image.png", buffer)
     * @since 2.0.0
     */
    setBackground(image: string | Buffer): this;
    /**
     * Change captcha text options
     * @param {SetCaptchaOptions} options Captcha appearance options.
     * @example
     * const { CaptchaGenerator } = require("captcha-canvas");
     * const fs = require("fs")
     * const captcha = new CaptchaGenerator();
     * const options = {font: "Comic Sans", size: 60}
     * captcha.setCaptcha(options)
     * const buffer = await captcha.generate() //generate image
     *
     * fs.writeFileSync("image.png", buffer)
     * @since 2.0.0
     */
    setCaptcha(option: SetCaptchaOption): this;
    /**
     * Change trace creation options.
     * @param {SetTraceOptions} options Trace Line appearance options.
     * @example
     * const { CaptchaGenerator } = require("captcha-canvas");
     * const fs = require("fs")
     * const captcha = new CaptchaGenerator();
     * const options = {size: 5, color: "deeppink"}
     * captcha.setTrace(options)
     * const buffer = await captcha.generate() //generate image
     *
     * fs.writeFileSync("image.png", buffer)
     * @since 2.0.0
     */
    setTrace(option: SetTraceOption): this;
    /**
     * Change decoy options
     * @param {SetDecoyOptions} options Decoy characters customisation options
     * @since 2.0.0
     */
    setDecoy(option: SetDecoyOption): this;
    /**
     * Method which returns image buffer
     * @async
     * @returns {Promise<Buffer>}
     * @example
     * const { CaptchaGenerator } = require("captcha-canvas");
     * const fs = require("fs")
     * const captcha = new CaptchaGenerator();
     * const buffer = await captcha.generate() //generate image
     *
     * fs.writeFileSync("image.png", buffer)
     * @since 2.0.0
     */
    generate(): Promise<Buffer>;
    /**
     * Non asynchronous method to generate captcha image.
     * > Note: It do not use `setBackground` method value for background image. If you want to set background
     * and also use generateSync method then use background option in genrateSync method.
     * @param {object} [options] Options to add extra values
     * @param {Image} [options.background] Add background image.
     * @example
     * const { CaptchaGenerator, resolveImage } = require("captcha-canvas");
     * const fs = require("fs");
     * const img = await resolveImage("./path/to/file");
     *
     * const captcha = new CaptchaGenerator()
     * .generateSync({background: img});
     *
     * fs.writeFileSync("image.png", captcha);
     * @since 2.2.0
     */
    generateSync(option?: {
        background?: Image;
    }): Buffer;
}
