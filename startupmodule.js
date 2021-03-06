// Generated by CoffeeScript 2.5.1
(function() {
  var c, cliArguments, errLog, generateProcess, log, startupmodule, successLog;

  startupmodule = {
    name: "startupmodule"
  };

  //region node_modules
  c = require('chalk');

  //endregion

  //log Switch
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["startupmodule"] != null) {
      console.log("[startupmodule]: " + arg);
    }
  };

  //region internal variables
  errLog = function(arg) {
    return console.log(c.red(arg));
  };

  successLog = function(arg) {
    return console.log(c.green(arg));
  };

  generateProcess = null;

  cliArguments = null;

  //endregion

  //#initialization function  -> is automatically being called!  ONLY RELY ON DOM AND VARIABLES!! NO PLUGINS NO OHTER INITIALIZATIONS!!
  startupmodule.initialize = function() {
    log("startupmodule.initialize");
    generateProcess = allModules.generateprocessmodule;
    return cliArguments = allModules.cliargumentsmodule;
  };

  //region internal functions
  //endregion

  //region exposed functions
  startupmodule.cliStartup = async function() {
    var done, e, err;
    log("startupmodule.cliStartup");
    try {
      e = cliArguments.extractArguments();
      // console.log(chalk.yellow("caught arguments are: " + args._))
      done = (await generateProcess.execute(e.name, e.thingyPath));
      if (done) {
        return successLog('All done!');
      }
    } catch (error) {
      err = error;
      errLog('Error!');
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log(err);
      }
      return console.log("\n");
    }
  };

  //endregion exposed functions
  module.exports = startupmodule;

}).call(this);
