const Greeting = require("./Base");

module.exports = class Welcome extends Greeting {
    constructor() {
        super();
        this.textTitle = "WELCOME";
        this.textMessage = "Welcome in {server}";
        this.colorTitle = "#03A9F4";
    }
};