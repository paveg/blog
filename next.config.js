/**
 * @type {import('next').NextConfig}
 *
 * @see https://zenn.dev/d_suke/articles/30925e50d5503f
 * @type {import('next-export-optimize-images').Config}
 */
const withExportImages = require('next-export-optimize-images');

module.exports = withExportImages({
  images: {
    domains: ['images.microcms-assets.io']
  },
  reactStrictMode: true
});
