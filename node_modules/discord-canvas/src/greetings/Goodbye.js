const Greeting = require("./Base");

module.exports = class Goodbye extends Greeting {
    constructor() {
        super();
        this.textTitle = "GOODBYE";
        this.textMessage = "Leaving from {server}";
        this.colorTitle = "#df0909";
    }
};