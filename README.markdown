#Node Magickal
Async-wrapper around the GraphicsMagick command line tools.

##Example:
    var magickal = require('./magickal');
    magickal
        .image("input.png")
        .resize(75, 75)
        .write("output.gif", function() {
            sys.puts("Done");
        });
