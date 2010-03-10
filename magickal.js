(function() {

    var sys = require('sys');

    var Magickal = {}
    Magickal.Image = function(input) {
        this.input = input;
    };

    Magickal.Image.prototype = {
        inArgs : [],

        outArgs : [],

        cropResized : function(width, height, gravity) {
            return this.resize(width, height).crop(width, height)
        },

        resize : function(width, height) {
            var wh = width + "x" + height;
            return this.makeArgs(["-resize", wh]);
        },

        crop : function(width, height) {
            var wh = width + "x" + height;
            return this.makeArgs(["-crop", wh]);
        },

        makeArgs : function(inargs, outargs) {
            if (arguments.length == 1) {
                outargs = inargs;
                inargs = null;
            }
            if (inargs) {
                this.inArgs = this.inArgs.concat(inargs);
            }
            if (outargs) {
                this.outArgs = this.outArgs.concat(outargs);
            }
            return this;
        },

        write : function(out, callback) {
            this.inArgs.push(this.input); 
            this.outArgs.push(out);
            var args = this.inArgs.concat(this.outArgs);
            this.__run("convert", args, callback);
        },

        __run : function (cmd, args, callback) {
            args.unshift(cmd);
            cmd = "gm";
            sys.puts("running command: " + cmd + " " + args.join(" "));
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
