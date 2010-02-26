(function() {

    var sys = require('sys');
    var Magickal = function() {
        this.available = 5;
        this.queue = [];
    };

    Magickal.prototype = {
        convert : function(to, from, callback) {
            this.__run("convert", [to, from], callback);
        },

        __run : function (cmd, args, callback) {
            sys.puts("running command: " + cmd + " - " + args.join(" "));
            if (this.available > 0) {
                this.available -= 1
                var p = process.createChildProcess(cmd, args);
                p.addListener("output", callback);
                p.addListener("error", this.errorHandler);
                p.addListener("exit", this.onExit(p));
            } else {
                this.queue.push([cmd, args, callback]); 
            }
        },

        checkQueue : function() {
            var cmd = this.queue.pop();
            if (cmd) {
                this.__run.apply(this, cmd);
            }
        },

        onExit : function(proc) {
            var self = this;
            return function (data) {
                self.available += 1;
                self.checkQueue();
                sys.puts("Process: " + proc.pid + " finished. " + self.available + ", available");
            }
        },

        errorHandler : function(err) {
            if (err) sys.puts(err);
        }
    }
    
    var magickal = new Magickal;
 
    var total = 3; 
    for (var i = 0; i < total; i++)
        magickal.convert("test.png", "converted/test-" + i + ".gif");

})();
