const { sellOperation, buyOperation } = require("./operations");

const buffer = function (inputLine) {
  const bufferOfOperations = formatStringToArray(inputLine);
  
  return bufferOfOperations.map((operations) => {
    let bufferWeightedAverage = 0;
    let bufferActualStocks = 0;
    let bufferLoss = 0;

    return operations.map(({ operation, quantity, ...args }) => {
      if (operation === "buy") {
        let { weightedAverage, actualStocks, tax } = buyOperation({
          unitCost: args["unit-cost"],
          quantity,
          actualStocks: bufferActualStocks,
          weightedAverage: bufferWeightedAverage,
        });

        bufferWeightedAverage = weightedAverage;
        bufferActualStocks = actualStocks;

        return tax;
      }

      if (operation === "sell") {
        let { accumulatedLoss, actualStocks, tax } = sellOperation({
          unitCost: args["unit-cost"],
          quantity,
          actualStocks: bufferActualStocks,
          accumulatedLoss: bufferLoss,
          weightedAverage: bufferWeightedAverage,
        });

        bufferLoss = accumulatedLoss;
        bufferActualStocks = actualStocks;

        return tax;
      }
    });
  });
};

const formatStringToArray = (inputData) => {
  return inputData
    .match(/\[(.*?)\]/g)
    .map((operations) => JSON.parse(operations));
};

module.exports = buffer;
