#!/usr/bin/env node
// Generated by CoffeeScript 2.5.1
(function() {
  var Modules, run;

  Modules = require("./allmodules.js");

  global.allModules = Modules;

  run = async function() {
    var err, m, n, promises;
    try {
      promises = (function() {
        var results;
        results = [];
        for (n in Modules) {
          m = Modules[n];
          results.push(m.initialize());
        }
        return results;
      })();
      await Promise.all(promises);
      return (await Modules.startupmodule.cliStartup());
    } catch (error) {
      err = error;
      console.log("Catched error in outmost level:");
      console.log(err);
      return process.exit(-1);
    }
  };

  run();

}).call(this);
