const {
  hasPayTax,
  saleHadLoss,
  hasProfit,
  taxCalculation,
  isZero,
  calculateLoss,
  increaseStocks,
  deductionLoss,
  hasLossToDeduction,
  calculateTotal,
  calculateWeightedAverage,
  zeroTax,
  formatResource,
} = require("../capitalGainFunctions");

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

/**
 * hasPayTax
 */
outputTestName("hasPayTax");

(function () {
  console.info(successEmoji, "check if total sell cost = 30000 has pay tax");

  const result = hasPayTax(30000);

  assert.equal(result, true);
})();

(function () {
  console.info(
    successEmoji,
    "check if total sell cost = 20000 NOT has pay tax"
  );

  const result = hasPayTax(20000);

  assert.equal(result, false);
})();

(function () {
  console.info(
    successEmoji,
    "check if total sell cost = 10000 NOT has pay tax"
  );

  const result = hasPayTax(10000);

  assert.equal(result, false);
})();

/**
 * saleHadLoss
 */
outputTestName("saleHadLoss");

(function () {
  console.info(
    successEmoji,
    "check if sale NOT had loss with sell unit 30 and average 15"
  );

  const result = saleHadLoss(30, 15);

  assert.equal(result, false);
})();

(function () {
  console.info(
    successEmoji,
    "check if sale had loss with sell unit 15 and average 30"
  );

  const result = saleHadLoss(15, 30);

  assert.equal(result, true);
})();

/**
 * hasProfit
 */
outputTestName("hasProfit");

(function () {
  console.info(
    successEmoji,
    "check if accumulated loss is greater than zero then NOT have profit"
  );

  const result = hasProfit(3000);

  assert.equal(result, false);
})();

(function () {
  console.info(
    successEmoji,
    "check if accumulated loss is less than zero then have profit"
  );

  const result = hasProfit(-3000);

  assert.equal(result, true);
})();

/**
 * taxCalculation
 */
outputTestName("taxCalculation");

(function () {
  console.info(
    successEmoji,
    "check if tax calculation is 0.2 percent of the value"
  );

  const result = taxCalculation(3000);

  assert.equal(result, 3000 * 0.2);
})();

(function () {
  console.info(
    successEmoji,
    "check if tax calculation is NOT EQUAL than 0.2 percent of the value"
  );

  const result = taxCalculation(3000);

  assert.notEqual(result, 3000 * 0.4);
})();

/**
 * isZero
 */
outputTestName("isZero");

(function () {
  console.info(successEmoji, "check if 10 is NOT EQUAL to 0");
  const result = isZero(10);
  assert.equal(result, false);
})();

(function () {
  console.info(successEmoji, "check if 0 is EQUAL to 0");
  const result = isZero(0);
  assert.equal(result, true);
})();

/**
 * calculateLoss
 */
outputTestName("calculateLoss");

(function () {
  console.info(successEmoji, "check if calculate loss is EQUAL to 50.000");
  const result = calculateLoss({
    actualStocks: 10000,
    weightedAverage: 10,
    unitCostSell: 20,
    quantity: 5000,
  });
  assert.equal(result, 50000);
})();

(function () {
  console.info(successEmoji, "check if calculate loss is EQUAL to 100.000");
  const result = calculateLoss({
    actualStocks: 10000,
    weightedAverage: 30,
    unitCostSell: 10,
    quantity: 5000,
  });
  assert.equal(result, 100000);
})();

/**
 * increaseStocks
 */
outputTestName("increaseStocks");

(function () {
  console.info(successEmoji, "check if increase stocks is EQUAL to 3000");
  const result = increaseStocks({
    actualStocks: 1000,
    stocksToAdd: 2000,
  });
  assert.equal(result, 3000);
})();

/**
 * deductionLoss
 */
outputTestName("deductionLoss");

(function () {
  console.info(successEmoji, "check if deduction loss is EQUAL to 5000");
  const result = deductionLoss({
    accumulatedLoss: 10000,
    valueToDeduction: 5000,
  });
  assert.equal(result, 5000);
})();

/**
 * hasLossToDeduction
 */
outputTestName("hasLossToDeduction");

(function () {
  console.info(successEmoji, "check if has loss to deduction");
  const result = hasLossToDeduction(1000);
  assert.equal(result, true);
})();

(function () {
  console.info(successEmoji, "check if NOT has loss to deduction");
  const result = hasLossToDeduction(0);
  assert.equal(result, false);
})();

/**
 * calculateTotal
 */
outputTestName("calculateTotal");

(function () {
  console.info(successEmoji, "check if calculate total is EQUAL to 30.000");
  const result = calculateTotal(10, 3000);
  assert.equal(result, 30000);
})();

/**
 * calculateWeightedAverage
 */
outputTestName("calculateWeightedAverage");

(function () {
  console.info(
    successEmoji,
    "check if calculate Weighted Average is EQUAL to 2166.67"
  );
  const result = calculateWeightedAverage({
    totalActualStocks: 100000,
    totalBuyStocks: 30000,
    quantityActualStocks: 40,
    quantityBuyStocks: 20,
  });
  assert.equal(result, 2166.67);
})();

(function () {
  console.info(
    successEmoji,
    "check if calculate Weighted Average is EQUAL to 15"
  );
  const result = calculateWeightedAverage({
    totalActualStocks: 100000,
    totalBuyStocks: 125000,
    quantityActualStocks: 10000,
    quantityBuyStocks: 5000,
  });
  assert.equal(result, 15);
})();

/**
 * zeroTax
 */
outputTestName("zeroTax");

(function () {
  console.info(successEmoji, "check if zero tax return 0");
  const result = zeroTax();
  assert.equal(result, 0);
})();

/**
 * formatResource
 */
outputTestName("formatResource");

(function () {
  console.info(
    successEmoji,
    "check if format resource return tax with two decimal cases 15.44"
  );
  const result = formatResource(15.4356);
  assert.deepEqual(result, {
    tax: 15.44,
  });
})();

(function () {
  console.info(
    successEmoji,
    "check if format resource return tax with two decimal cases 10.00"
  );
  const result = formatResource(10);
  assert.deepEqual(result, {
    tax: 10.0,
  });
})();
