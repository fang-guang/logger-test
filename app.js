const Koa = require('koa')
const _ = require('lodash')
const routes = require('./router');

const app = new Koa();

const { logger_type } = process.env
const logger = require(`./error-handle/${logger_type}`)
// sentry 报错
const sentry = require('./connectors/sentry');

app.on('error', (err) => {
  logger.error(err);
  sentry.captureException(err);
});

// sentry
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500
    const errData = _.pick(err, ['pid', 'type', 'method', 'query', 'body', 'status', 'ip', 'header', 'stack', 'message', 'error_id']);
    ctx.body = errData;
    ctx.status > 500 ? app.emit('error', err) : logger.error(errData) 
  }
});

app.use(routes());

if (!module.parent) {
  app.listen(3000);
  logger.info(`app start port in 3000`);
}

module.exports = app;
