var repl = require("repl"),
    magickal = require("./magickal");
    
process.mixin(magickal);

repl.start("magickal >>");
