const winston = require('winston');
const _ = require('lodash');

const config = {
  console: {
    /**
     * @param {String} transport 日志信息输出到哪里控制台，默认[]当前支持的传输是：控制台、文件、内存。（ Console, File, Memory）
     * @param {Boolean} enable  确保应用config配置
     * @param {Object} option 配置控制台输出
     * @param {String} option.json 输出为json对象 默认false）
     * @param {String} option.stringify 输出通过JSON.stringify传递 默认false
     * @param {String} option.timestamp 在输出前加上时间戳 默认false
     * @param {String} option.humanReadableUnhandledException 未捕获的异常输出为可读的
     */
    enable: true,
    transport: 'Console',
    option: {
      json: true,
      stringify: true,
      timestamp: true,
      humanReadableUnhandledException: true,
    },
  },
};

const transports = _.map(config, (payload) => {
  if (!payload.enable) { return 0; }

  return new (winston.transports[payload.transport])(payload.option);
}).filter(_.identity);

const logger = winston.createLogger({ transports });

module.exports = logger;
