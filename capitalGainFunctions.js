const BASE_VALUE_TO_PAY_TAX = 20000;
const PERCENT_TAX_CALCULATION = 0.2;

const hasPayTax = (totalSellCost) => totalSellCost > BASE_VALUE_TO_PAY_TAX;

const saleHadLoss = (unitCostSell, weightedAverage) => {
  return unitCostSell < weightedAverage;
};

const hasProfit = (accumulatedLoss) => {
  return accumulatedLoss < 0;
};

const taxCalculation = (value) => {
  return Math.abs(value * PERCENT_TAX_CALCULATION);
};

const isZero = (value) => value == 0;

const calculateLoss = ({
  actualStocks,
  weightedAverage,
  unitCostSell,
  quantity,
}) => {
  return Math.abs(
    actualStocks * weightedAverage +
      unitCostSell * quantity -
      (actualStocks + quantity) * weightedAverage
  );
};

const increaseStocks = ({ actualStocks, stocksToAdd }) => {
  return actualStocks + stocksToAdd;
};

const deductionLoss = ({ accumulatedLoss, valueToDeduction }) => {
  return accumulatedLoss - valueToDeduction;
};

const hasLossToDeduction = (accumulatedLoss) => accumulatedLoss > 0;

const calculateTotal = (unitCost, quantity) => unitCost * quantity;

const calculateWeightedAverage = ({
  totalActualStocks,
  totalBuyStocks,
  quantityActualStocks,
  quantityBuyStocks,
}) => {
  return Math.round(
    (totalActualStocks + totalBuyStocks) /
    (quantityActualStocks + quantityBuyStocks) * 100
  ) / 100;
};

const zeroTax = () => 0;

const formatResource = (value) => ({
  tax: value.toFixed(2),
});

module.exports = {
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
};
