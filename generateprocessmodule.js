// Generated by CoffeeScript 2.4.1
(function() {
  var c, generateprocessmodule, log, modulegen, pathHandler, successMessage, userInquiry;

  generateprocessmodule = {
    name: "generateprocessmodule"
  };

  //region node_modules
  c = require('chalk');

  //endregion

  //log Switch
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["generateprocessmodule"] != null) {
      console.log("[generateprocessmodule]: " + arg);
    }
  };

  //region internal variables
  successMessage = function(arg) {
    return console.log(c.green(arg));
  };

  userInquiry = null;

  pathHandler = null;

  modulegen = null;

  //endregion

  //#initialization function  -> is automatically being called!  ONLY RELY ON DOM AND VARIABLES!! NO PLUGINS NO OHTER INITIALIZATIONS!!
  generateprocessmodule.initialize = function() {
    log("generateprocessmodule.initialize");
    userInquiry = allModules.userinquirymodule;
    pathHandler = allModules.pathhandlermodule;
    return modulegen = allModules.modulegenmodule;
  };

  //region internal functions
  //endregion

  //region exposed functions
  generateprocessmodule.execute = async function(name, path) {
    var files;
    log("generateprocessmodule.execute");
    await pathHandler.checkPaths(name, path);
    successMessage(" Module " + name + " may be created!");
    files = (await userInquiry.doInquiry());
    await modulegen.generate(files, name);
    return true;
  };

  //endregion
  module.exports = generateprocessmodule;

}).call(this);
