//importing the files
const meme = require("./lib/Meme");
//function for generating a new meme
function Meme(token) {
    return new meme(token);
}
Meme.Memer = meme;
Meme.version = require("./package.json").version;

//exporting this meme
module.exports = Meme;
