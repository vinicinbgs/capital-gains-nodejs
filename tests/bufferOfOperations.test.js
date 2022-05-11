const { assert, outputTestName, outputTestSuccess } = require("./base");

const bufferOfOperations = require("../bufferOfOperations");

/**
 * bufferOfOperations
 */
outputTestName("bufferOfOperations");

(function () {
  outputTestSuccess("check if input case1+2 return pay 0.00 and 10000.00 tax");

  const fs = require("fs");

  try {
    const input = fs.readFileSync(__dirname + "/../inputs/case1+2.txt", "utf8");

    const result = input
      .toString()
      .split("\n")
      .map((line) => {
        return bufferOfOperations(line);
      });

    assert.deepEqual(result[0], [
      { tax: "0.00" },
      { tax: "0.00" },
      { tax: "0.00" },
    ]);

    assert.deepEqual(result[1], [
      { tax: "0.00" },
      { tax: "10000.00" },
      { tax: "0.00" },
    ]);
  } catch (e) {
    console.log("Error:", e.stack);
  }
})();

(function () {
  outputTestSuccess("check if input case2 return pay 10000.00 tax");

  const input = require("../inputs/case2.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [
    { tax: "0.00" },
    { tax: "10000.00" },
    { tax: "0.00" },
  ]);
})();

(function () {
  outputTestSuccess("check if input case3 return pay 1000.00 tax");

  const input = require("../inputs/case3.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "1000.00" },
  ]);
})();

(function () {
  outputTestSuccess("check if input case4 return pay 0.00 tax");

  const input = require("../inputs/case4.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [{ tax: "0.00" }, { tax: "0.00" }, { tax: "0.00" }]);
})();

(function () {
  outputTestSuccess("check if input case5 return pay 10000.00 tax");

  const input = require("../inputs/case5.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "10000.00" },
  ]);
})();

(function () {
  outputTestSuccess("check if input case6 return pay 3000.00 tax");

  const input = require("../inputs/case6.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "3000.00" },
  ]);
})();

(function () {
  outputTestSuccess("check if input case7 return pay 3000.00 and 3700.00 tax");

  const input = require("../inputs/case7.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "3000.00" },
    { tax: "0.00" },
    { tax: "0.00" },
    { tax: "3700.00" },
    { tax: "0.00" },
  ]);
})();

(function () {
  outputTestSuccess(
    "check if input case8 return pay 80000.00 and 60000.00 tax"
  );

  const input = require("../inputs/case8.json");

  const result = bufferOfOperations(input);

  assert.deepEqual(result, [
    { tax: "0.00" },
    { tax: "80000.00" },
    { tax: "0.00" },
    { tax: "60000.00" },
  ]);
})();
