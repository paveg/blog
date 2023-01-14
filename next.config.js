/**
 * @type {import('next').NextConfig}
 *
 * @removed https://zenn.dev/d_suke/articles/30925e50d5503f
 */
const withPlugins = require('next-compose-plugins');
const { BugsnagSourceMapUploaderPlugin } = require('webpack-bugsnag-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const appVersion = process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA || 'latest';

module.exports = withPlugins([withBundleAnalyzer], {
  productionBrowserSourceMaps: true,
  publicRuntimeConfig: {
    version: appVersion,
  },
  webpack: (config) => {
    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
      config.plugins.push(
        new BugSnagSourceMapUploadPlugin({
          apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY,
          appVersion: appVersion,
          overwrite: true,
          publicPath: "*/",
        })
      )
    }

    return config;
  },
  rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*.map',
          destination: '/404',
        },
      ],
    }
  },
  images: {
    domains: ['images.microcms-assets.io']
  },
  reactStrictMode: true
});
