const readline = require("readline");

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const main = (callback) => {
    readlineInterface.on("line", callback);
}

const { log } = console;

module.exports = {
  main,
  log
}