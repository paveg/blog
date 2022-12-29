/**
 * @type {import('next').NextConfig}
 *
 * @removed https://zenn.dev/d_suke/articles/30925e50d5503f
 */
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withPlugins([withBundleAnalyzer], {
  images: {
    domains: ['images.microcms-assets.io']
  },
  reactStrictMode: true
});
