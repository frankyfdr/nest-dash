export default () => ({
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
});
