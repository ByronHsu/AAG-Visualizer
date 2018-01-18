const env = process.env;

module.exports = {
  port: env.PORT || 3000,
  host: env.HOST || '0.0.0.0',
};
