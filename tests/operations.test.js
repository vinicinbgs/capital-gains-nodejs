const { assert, outputTestName, outputTestSuccess } = require("./base");

const { buyOperation, sellOperation } = require("../operations");

/**
 * buyOperation
 */
outputTestName("buyOperation");

(function () {
  outputTestSuccess(
    "check if perform correctly buy operation with weightedAverage 0"
  );

  const result = buyOperation({
    actualStocks: 5000,
    quantity: 5000,
    unitCost: 15,
    weightedAverage: 0,
  });

  assert.deepEqual(result, {
    actualStocks: 10000,
    weightedAverage: 15,
    tax: {
      tax: 0.0,
    },
  });
})();

(function () {
  outputTestSuccess(
    "check if perform correctly buy operation with weightedAverage NOT 0"
  );

  const result = buyOperation({
    actualStocks: 10000,
    quantity: 5000,
    unitCost: 30,
    weightedAverage: 15,
  });

  assert.deepEqual(result, {
    actualStocks: 15000,
    weightedAverage: 20,
    tax: {
      tax: 0.0,
    },
  });
})();

/**
 * sellOperation
 */
outputTestName("sellOperation");

(function () {
  outputTestSuccess("check if perform correctly sell operation");

  const result = sellOperation({
    unitCost: 20,
    actualStocks: 20000,
    quantity: 10000,
    accumulatedLoss: 0,
    weightedAverage: 15,
  });

  assert.deepEqual(result, {
    accumulatedLoss: 0,
    actualStocks: 10000,
    tax: { tax: "10000.00" },
  });
})();

(function () {
  outputTestSuccess("check if perform correctly sell operation with loss");

  const result = sellOperation({
    unitCost: 2,
    actualStocks: 10000,
    quantity: 5000,
    accumulatedLoss: 0,
    weightedAverage: 10,
  });

  assert.deepEqual(result, {
    accumulatedLoss: 40000,
    actualStocks: 5000,
    tax: { tax: "0.00" },
  });
})();

(function () {
  outputTestSuccess("check if perform correctly sell operation with loss");

  const result = sellOperation({
    unitCost: 20,
    actualStocks: 5000,
    quantity: 2000,
    accumulatedLoss: 40000,
    weightedAverage: 10,
  });

  assert.deepEqual(result, {
    accumulatedLoss: 20000,
    actualStocks: 3000,
    tax: { tax: "0.00" },
  });
})();
