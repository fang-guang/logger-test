const Sentry = require('@sentry/node');
const sentryConfig  =  {
  dsn: 'https://b239c5ec06b04ebea1f7f11d74abc2e4@o382783.ingest.sentry.io/5212168',
  options: {
    captureUnhandledRejections: true,
  },
};

Sentry.init(sentryConfig);

module.exports = Sentry;
