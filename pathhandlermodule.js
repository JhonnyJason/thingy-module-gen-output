// Generated by CoffeeScript 2.6.1
(function() {
  var CLI, Spinner, c, checkDirectoryExists, checkProvidedPath, findModulePath, findSourcePath, fs, log, pathModule, pathhandlermodule;

  pathhandlermodule = {
    name: "pathhandlermodule"
  };

  //region node_modules
  c = require('chalk');

  CLI = require('clui');

  Spinner = CLI.Spinner;

  fs = require("fs-extra");

  pathModule = require("path");

  //endregion

  //log Switch
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["pathhandlermodule"] != null) {
      console.log("[pathhandlermodule]: " + arg);
    }
  };

  //region internal variables
  //endregion

  //region exposed variables
  pathhandlermodule.sourcePath = "";

  pathhandlermodule.modulePath = "";

  pathhandlermodule.thingyPath = "";

  //endregion

  //#initialization function  -> is automatically being called!  ONLY RELY ON DOM AND VARIABLES!! NO PLUGINS NO OHTER INITIALIZATIONS!!
  pathhandlermodule.initialize = function() {
    return log("pathhandlermodule.initialize");
  };

  //region internal functions
  checkDirectoryExists = async function(path) {
    var err, stats;
    try {
      stats = (await fs.lstat(path));
      return stats.isDirectory();
    } catch (error) {
      err = error;
      // console.log(c.red(err.message))
      return false;
    }
  };

  findSourcePath = async function() {
    var exists, sourcePath;
    log("findSourcePath");
    sourcePath = pathModule.resolve(pathhandlermodule.thingyPath, "sources/source");
    exists = (await checkDirectoryExists(sourcePath));
    if (!exists) {
      throw new Error("sourcePath: " + sourcePath + " did not exist! The provided path might not be the thingy root.");
    }
    return pathhandlermodule.sourcePath = sourcePath;
  };

  findModulePath = async function(name) {
    var exists, modulePath;
    log("findModulePath");
    modulePath = pathModule.resolve(pathhandlermodule.sourcePath, name);
    exists = (await checkDirectoryExists(modulePath));
    if (exists) {
      throw new Error("modulePath: " + modulePath + " did already exist! So the module already exists...");
    }
    return pathhandlermodule.modulePath = modulePath;
  };

  checkProvidedPath = async function(providedPath) {
    var exists;
    log("checkProvidedPath");
    if (providedPath) {
      if (!pathModule.isAbsolute(providedPath)) {
        providedPath = pathModule.resolve(process.cwd(), providedPath);
      }
    } else {
      providedPath = process.cwd();
    }
    exists = (await checkDirectoryExists(providedPath));
    if (!exists) {
      throw new Error("Provided path:'" + providedPath + "' does not exist!");
    }
    return pathhandlermodule.thingyPath = providedPath;
  };

  //endregion

  //region exposed functions
  pathhandlermodule.checkPaths = async function(name, providedPath) {
    log("pathhandlermodule.checkPaths");
    log("checking for providedPath: " + providedPath);
    await checkProvidedPath(providedPath);
    log("resulting thingy path is: " + pathhandlermodule.thingyPath);
    await findSourcePath();
    return (await findModulePath(name));
  };

  pathhandlermodule.getModulePath = function() {
    return pathhandlermodule.modulePath;
  };

  pathhandlermodule.getSourcePath = function() {
    return pathhandlermodule.sourcePath;
  };

  //endregion
  module.exports = pathhandlermodule;

}).call(this);
