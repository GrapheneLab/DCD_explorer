const { resolve } = require('path');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = require(resolve(__dirname, 'webpack', `${NODE_ENV}.config`));
