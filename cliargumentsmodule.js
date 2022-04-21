// Generated by CoffeeScript 2.6.1
//#############################################################################
//region debug
var extractMeowed, getHelpText, getOptions, log, olog, throwErrorOnUsageFail;

import {
  createLogFunctions
} from "thingy-debug";

({log, olog} = createLogFunctions("cliargumentsmodule"));

import meow from 'meow';

//###############################################################################
//region internal functions
getHelpText = function() {
  log("getHelpText");
  return `Usage
    $ thingy-module-gen <arg1> <arg2>
    
Options
    required:
        arg1, --name <module-name>, -n <module-name>
        name of the module to be created                
    
    optional:
        arg2, --thingy-path <path/to/thingy>, -p <path/to/thingy> [default: ./ ]
        path to the root of the thingy. Usually it is cwd. Use it if you call this script from somewhere else.

TO NOTE:
    The flags will overwrite the flagless argument.
Examples
    $ thingy-module-gen  new-super-module 
    ...`;
};

getOptions = function() {
  log("getOptions");
  return {
    flags: {
      name: {
        type: "string",
        alias: "n"
      },
      thingyPath: {
        type: "string",
        alias: "p"
      }
    }
  };
};

//###############################################################################
extractMeowed = function(meowed) {
  var name, thingyPath;
  log("extractMeowed");
  name = "";
  thingyPath = "";
  if (meowed.input[0]) {
    name = meowed.input[0];
  }
  if (meowed.input[1]) {
    thingyPath = meowed.input[1];
  }
  if (meowed.flags.name) {
    name = meowed.flags.name;
  }
  if (meowed.flags.thingyPath) {
    thingyPath = meowed.flags.thingyPath;
  }
  if (!thingyPath) {
    thingyPath = ".";
  }
  return {name, thingyPath};
};

throwErrorOnUsageFail = function(extract) {
  log("throwErrorOnUsageFail");
  if (!extract.name) {
    throw "Usage error: obligatory option name was not provided!";
  }
  if (!extract.thingyPath) {
    throw "fatal error: no default thingyPath was not available as fallback!";
  }
  if (!(typeof extract.name === "string")) {
    throw "Usage error: option name was provided in an unexpected way!";
  }
  if (!(typeof extract.thingyPath === "string")) {
    throw "Usage error: option thingyPath was provided in an unexpected way!";
  }
};


//endregion

//###############################################################################
export var extractArguments = function() {
  var extract, meowed;
  log("extractArguments");
  meowed = meow(getHelpText(), getOptions());
  extract = extractMeowed(meowed);
  throwErrorOnUsageFail(extract);
  return extract;
};
