const withSass = require("@zeit/next-sass");
const withOffline = require('next-offline');
const withPlugins = require('next-compose-plugins');

const nextConfig = {};

// module.exports = withSass();
module.exports = withPlugins([withSass, withOffline], nextConfig);
