/**
 * @type {import('next').NextConfig}
 *
 * @see https://zenn.dev/d_suke/articles/30925e50d5503f
 * @type {import('next-export-optimize-images').Config}
 */
const withPlugins = require('next-compose-plugins');
const withExportImages = require('next-export-optimize-images');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withPlugins([withBundleAnalyzer, withExportImages], {
  images: {
    domains: ['images.microcms-assets.io']
  },
  reactStrictMode: true
});
