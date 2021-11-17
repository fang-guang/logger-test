const pino = require('pino');
const logger = pino({ formatters: true });
module.exports = logger;