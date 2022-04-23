#!/usr/bin/env node

const { main, log } = require("./cli");

const { sellOperation, buyOperation } = require("./operations");

main(function (inputLine) {
  const bufferOfOperations = formatStringToArray(inputLine);

  bufferOfOperations.forEach((operations) => {
    let bufferWeightedAverage = 0;
    let bufferActualStocks = 0;
    let bufferLoss = 0;

    const reponse = operations.map(({ operation, quantity, ...args }) => {
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

    log(reponse);
  });
});

const formatStringToArray = (inputData) => {
  return inputData
    .match(/\[(.*?)\]/g)
    .map((operations) => JSON.parse(operations));
};
