// Generated by CoffeeScript 2.5.1
(function() {
  var CoffeeGenTask, PugGenTask, StyleGenTask, Task, fs, generateModuleDirectory, generateTasks, getPugName, log, modulegenmodule, mustache, pathHandler, pathModule;

  modulegenmodule = {
    name: "modulegenmodule"
  };

  //region node_modules
  fs = require("fs-extra");

  mustache = require("mustache");

  pathModule = require("path");

  //endregion

  //log Switch
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["modulegenmodule"] != null) {
      console.log("[modulegenmodule]: " + arg);
    }
  };

  //region internal variables
  pathHandler = null;

  //endregion

  //#initialization function  -> is automatically being called!  ONLY RELY ON DOM AND VARIABLES!! NO PLUGINS NO OHTER INITIALIZATIONS!!
  modulegenmodule.initialize = function() {
    log("modulegenmodule.initialize");
    pathHandler = allModules.pathhandlermodule;
  };

  //region classes
  Task = class Task {
    constructor(moduleName) {
      this.moduleName = moduleName;
      return;
    }

    do() {}

  };

  CoffeeGenTask = (function() {
    var templatePath;

    class CoffeeGenTask extends Task {
      async do() {
        var fileContent, fileName, filePath, template;
        log("do CoffeeGenTask for module " + this.moduleName);
        fileName = this.moduleName + ".coffee";
        filePath = pathModule.resolve(pathHandler.modulePath, fileName);
        // log "filePath: " + filePath
        template = (await fs.readFile(templatePath, "utf-8"));
        fileContent = mustache.render(template, {
          moduleName: this.moduleName
        });
        
        // log "\n - - - \nfileContent:\n" + fileContent
        return (await fs.writeFile(filePath, fileContent));
      }

    };

    templatePath = pathModule.resolve(__dirname, "file-templates/template.coffee");

    return CoffeeGenTask;

  }).call(this);

  PugGenTask = (function() {
    var templatePath;

    class PugGenTask extends Task {
      async do() {
        var fileContent, fileName, filePath, pugname, template;
        log("do PugGenTask for module " + this.moduleName);
        pugname = getPugName(this.moduleName);
        // log "pugname: " + pugname
        fileName = pugname + ".pug";
        filePath = pathModule.resolve(pathHandler.modulePath, fileName);
        // log "filePath: " + filePath
        template = (await fs.readFile(templatePath, "utf-8"));
        fileContent = mustache.render(template, {
          moduleName: pugname
        });
        // log "\n - - - \nfileContent:\n" + fileContent
        return (await fs.writeFile(filePath, fileContent));
      }

    };

    templatePath = pathModule.resolve(__dirname, "file-templates/template.pug");

    return PugGenTask;

  }).call(this);

  StyleGenTask = (function() {
    var templatePath;

    class StyleGenTask extends Task {
      async do() {
        var fileContent, fileName, filePath, pugname, template;
        log("do StyleGenTask for module " + this.moduleName);
        fileName = "styles.styl";
        pugname = getPugName(this.moduleName);
        // log "pugname: " + pugname
        filePath = pathModule.resolve(pathHandler.modulePath, fileName);
        // log "filePath: " + filePath
        template = (await fs.readFile(templatePath, "utf-8"));
        fileContent = mustache.render(template, {
          moduleName: pugname
        });
        // log "\n - - - \nfileContent:\n" + fileContent
        return (await fs.writeFile(filePath, fileContent));
      }

    };

    templatePath = pathModule.resolve(__dirname, "file-templates/template.styl");

    return StyleGenTask;

  }).call(this);

  //endregion

  //region internal functions
  getPugName = function(name) {
    var dif, index;
    log("getPugName");
    index = name.lastIndexOf("module");
    dif = name.length - index;
    if (dif === 6) {
      return name.substring(0, index);
    }
    return name;
  };

  generateModuleDirectory = async function() {
    var dirPath, result;
    log("generateModuleDirectory");
    dirPath = pathHandler.modulePath;
    result = (await fs.mkdirs(dirPath));
    return log(result);
  };

  generateTasks = function(files, name) {
    var file, i, len, tasks;
    log("generateTasks");
    tasks = [];
    for (i = 0, len = files.length; i < len; i++) {
      file = files[i];
      switch (file) {
        case ".coffee":
          tasks.push(new CoffeeGenTask(name));
          break;
        case ".pug":
          tasks.push(new PugGenTask(name));
          break;
        case "styles.styl":
          tasks.push(new StyleGenTask(name));
          break;
        default:
          throw "unknown option to generate Task for: " + file;
      }
    }
    return tasks;
  };

  //endregion

  //region exposed functions
  modulegenmodule.generate = async function(files, name) {
    var promises, task, tasks;
    log("modulegenmodule.generate");
    tasks = generateTasks(files, name);
    await generateModuleDirectory();
    promises = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = tasks.length; i < len; i++) {
        task = tasks[i];
        results.push(task.do());
      }
      return results;
    })();
    return (await Promise.all(promises));
  };

  
  //endregion
  module.exports = modulegenmodule;

}).call(this);
