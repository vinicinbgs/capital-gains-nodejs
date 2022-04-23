const assert = require("assert");

const successEmoji = "✅";
const testEmoji = "🧪";
const fontYellowColor = "\x1b[33m";
const fontGreenColor = "\x1b[32m";
const fontNoColor = "\x1b[0m";

const outputTestName = (testname) => {
  console.log(
    testEmoji,
    fontYellowColor + "TEST Function:" + fontNoColor,
    fontGreenColor + testname + fontNoColor
  );
};

const outputTestSuccess = (description) => {
    console.info(successEmoji, description);
}

module.exports = {
  outputTestSuccess,
  outputTestName,
  assert,
};
