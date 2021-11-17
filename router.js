const Router = require('koa-router');
const {nanoid} = require('nanoid')
const {logger_type} = process.env;
const Boom = require('@hapi/boom');
const sentry= require('./connectors/sentry')

module.exports = () => {
  const router = new Router();
  // 测试
  router.get('/', (ctx) => {
    ctx.body = { hello: 'manji' };
  });

  // 输出异常
  router.get('/throw', (ctx) => {
    const err = Boom.unauthorized( `${logger_type} error throw`);
    err.url = ctx.url;
    err.method = ctx.method;
    err.type = 'bad request';
    err.header = ctx.header;
    err.body = ctx.body || {};
    err.query = ctx.query || {};
    err.status = err.output.statusCode;
    err.error_id = nanoid();
    err.ip = ctx.host;
    if(ctx.query.is_sentry){
      sentry.captureException(err);
    }
    throw err;
  });

  return router.routes();
};
