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
  formatResource
} = require("./capitalGainFunctions");

const buyOperation = ({
  unitCost,
  quantity,
  actualStocks,
  weightedAverage,
}) => {
  if (isZero(weightedAverage)) {
    weightedAverage = unitCost;
  } else {
    weightedAverage = calculateWeightedAverage({
      totalActualStocks: calculateTotal(actualStocks, weightedAverage),
      totalBuyStocks: calculateTotal(quantity, unitCost),
      quantityActualStocks: actualStocks,
      quantityBuyStocks: quantity,
    });
  }

  return {
    actualStocks: increaseStocks({ actualStocks, stocksToAdd: quantity }),
    weightedAverage,
    tax: formatResource(zeroTax()),
  };
};

const sellOperation = ({
  unitCost,
  actualStocks,
  quantity,
  accumulatedLoss,
  weightedAverage,
}) => {
  let unitCostSell = unitCost;
  let totalWithSellPrice = calculateTotal(unitCost, quantity);
  let totalWithWeightedAverage = calculateTotal(weightedAverage, quantity);

  actualStocks = actualStocks - quantity;

  if (saleHadLoss(unitCostSell, weightedAverage)) {
    accumulatedLoss = calculateLoss({
      actualStocks,
      weightedAverage,
      unitCostSell,
      quantity,
    });

    return {
      accumulatedLoss,
      actualStocks,
      tax: formatResource(zeroTax()),
    };
  }

  let valueToDeduction = 0;
  let tax = 0;

  if (hasLossToDeduction(accumulatedLoss)) {
    valueToDeduction = calculateLoss({
      actualStocks,
      weightedAverage,
      unitCostSell,
      quantity,
    });

    accumulatedLoss = deductionLoss({ accumulatedLoss, valueToDeduction });
  }

  if (!hasPayTax(totalWithSellPrice - valueToDeduction)) {
    return {
      accumulatedLoss,
      actualStocks,
      tax: formatResource(zeroTax()),
    };
  }

  if (hasProfit(accumulatedLoss)) {
    tax = taxCalculation(accumulatedLoss);
  } else {
    tax = taxCalculation(totalWithSellPrice - totalWithWeightedAverage);
  }

  return {
    accumulatedLoss,
    actualStocks,
    tax: formatResource(tax),
  };
};

module.exports = {
  sellOperation,
  buyOperation,
};
