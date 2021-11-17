const log4js = require("log4js");

log4js.configure({
  // 设置可配置化的输出项
  appenders: { cheese: { type: "console", maxSize: 10485760, pattern: 'YYYY-MM-DD HH:mm:ss', } },
  categories: { default: { appenders: ["cheese"], level: "info" } },
});

module.exports = log4js.getLogger('log4js')