const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.BASE_PATH || "",
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, options) => {
    const { isServer } = options;
    config.module.rules.push({
      test: /\.hbs/,
      use: [
        {
          loader: "handlebars-loader",
          options: {
            partialDirs: [path.join(__dirname, "..", "..", "svg", "partials")],
            helperResolver(helper, callback) {
              if (helper.startsWith("./uint") || helper.startsWith("./int")) {
                callback(
                  null,
                  path.join(__dirname, "./handlebars-helpers", "int-helper.js")
                );
              } else {
                callback();
              }
            },
          },
        },
      ],
    },
    {
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      exclude: config.exclude,
      use: [
        {
          loader: require.resolve('url-loader'),
          options: {
            limit: config.inlineImageLimit,
            fallback: require.resolve('file-loader'),
            publicPath: `${config.assetPrefix}/_next/static/images/`,
            outputPath: `${isServer ? '../' : ''}static/images/`,
            name: '[name]-[hash].[ext]',
            esModule: config.esModule || false,
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
