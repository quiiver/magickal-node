(function() {

    var sys = require('sys');
    var Magickal = {}
    Magickal.Image = function(input) {
        this.input = input;
    };

    Magickal.Image.prototype = {
        argList : [],
        
        write: function(out, callback) {
            var args  = this.argList.concat([this.input, out]); 
            this.__run("convert", args, callback);
        },

        __run : function (cmd, args, callback) {
            args.unshift(cmd);
            cmd = "gm";
            sys.puts("running command: " + cmd + args.join(" "));
            var p = process.createChildProcess(cmd, args);
            p.addListener("output", callback);
            p.addListener("error", this.errorHandler);
            p.addListener("exit", this.onExit(p));
        },

        onExit : function(proc) {
            return function (data) {}
        },

        errorHandler : function(err) {
            if (err) sys.puts(err);
        }
    }
    
    exports.image = function(input) { 
        return new Magickal.Image(input); 
    };

})();
