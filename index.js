#!/usr/bin/env node

const { main, log } = require("./cli");

const bufferOfOperations = require("./bufferOfOperations");

main((input) => {
    const response = bufferOfOperations(input);
    log(response);
});
