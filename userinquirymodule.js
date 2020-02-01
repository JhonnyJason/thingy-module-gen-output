// Generated by CoffeeScript 2.5.1
(function() {
  var createQuestion, generateFileOptions, inquirer, log, userinquirymodule;

  userinquirymodule = {
    name: "userinquirymodule"
  };

  //region node_modules
  inquirer = require("inquirer");

  //endregion

  //log Switch
  log = function(arg) {
    if (allModules.debugmodule.modulesToDebug["userinquirymodule"] != null) {
      console.log("[userinquirymodule]: " + arg);
    }
  };

  //region internal variables
  //endregion

  //region exposed variables
  //endregion

  //#initialization function  -> is automatically being called!  ONLY RELY ON DOM AND VARIABLES!! NO PLUGINS NO OHTER INITIALIZATIONS!!
  userinquirymodule.initialize = function() {
    log("userinquirymodule.initialize");
  };

  //region internal functions
  generateFileOptions = function() {
    var options;
    options = [
      {
        name: ".coffee",
        checked: true
      },
      {
        name: ".pug"
      },
      {
        name: "styles.styl"
      }
    ];
    return options;
  };

  createQuestion = function(options) {
    return [
      {
        name: "filesToGenerate",
        type: "checkbox",
        message: "Which file do you need for this module?",
        choices: options
      }
    ];
  };

  //endregion

  //region exposed functions
  userinquirymodule.doInquiry = async function() {
    var answer, options, question;
    options = generateFileOptions();
    question = createQuestion(options);
    answer = (await inquirer.prompt(question));
    return answer.filesToGenerate;
  };

  //endregion
  module.exports = userinquirymodule;

}).call(this);
