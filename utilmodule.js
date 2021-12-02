// Generated by CoffeeScript 2.6.1
(function() {
  var exec, execFile, log, utilmodule;

  utilmodule = {
    name: "utilmodule"
  };

  //region noode_modules
  execFile = require('child_process').execFile;

  exec = require("child_process").exec;

  //endregion

  //log Switch
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["utilmodule"] != null) {
      console.log("[utilmodule]: " + arg);
    }
  };

  //region internal variables
  //endregion

  //region exposed variables
  //endregion

  //#initialization function  -> is automatically being called!  ONLY RELY ON DOM AND VARIABLES!! NO PLUGINS NO OHTER INITIALIZATIONS!!
  utilmodule.initialize = function() {
    return log("utilmodule.initialize");
  };

  //region internal functions
  //endregion

  //region exposed functions
  utilmodule.isFullURL = function(url) {
    var checker;
    if (url.length < 20) {
      return false;
    }
    checker = url.substr(0, 8);
    if (checker === "https://") {
      return true;
    }
    if (checker === "git@gith") {
      return true;
    }
    return false;
  };

  utilmodule.capitaliseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  utilmodule.execScriptPromise = function(script, options) {
    return new Promise(function(resolve, reject) {
      var callback;
      callback = function(error, stdout, stderr) {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(new Error(stderr));
        }
        return resolve(stdout);
      };
      return execFile(script, options, callback);
    });
  };

  utilmodule.execGitCheckPromise = function(path) {
    var options;
    options = {
      cwd: path
    };
    return new Promise(function(resolve, reject) {
      var callback;
      callback = function(error, stdout, stderr) {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(new Error(stderr));
        }
        return resolve(stdout);
      };
      return exec("git rev-parse --is-inside-work-tree", options, callback);
    });
  };

  //endregion
  module.exports = utilmodule;

}).call(this);
