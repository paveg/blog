import { GetServerSideProps } from 'next';
import React from 'react';
import { siteMetadata } from '@/config/siteMetadata';
import { FormattedISODate, FormattedTodayISODate } from '@/lib/date';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';

const generateSiteMap = (articles: Article[]) => {
  const today = FormattedTodayISODate();
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <!-- I manually set the some URLs I know already -->
    <url>
      <loc>${siteMetadata.url}</loc>
      <changefreq>daily</changefreq>
      <lastmod>${today}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${siteMetadata.url}/about-funailog</loc>
      <changefreq>daily</changefreq>
      <lastmod>${today}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${siteMetadata.url}/contact</loc>
      <changefreq>daily</changefreq>
      <lastmod>${today}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${siteMetadata.url}/privacy-policy</loc>
      <changefreq>daily</changefreq>
      <lastmod>${today}</lastmod>
      <priority>1.0</priority>
    </url>
    ${articles
      .map((article) => {
        return `
    <url>
      <loc>${siteMetadata.url}/articles/${article.id}</loc>
      <changefreq>weekly</changefreq>
      <lastmod>${FormattedISODate(article.revisedAt)}</lastmod>
      <priority>0.7</priority>
    </url>`;
      })
      .join('')}
    </urlset>
  `;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = await cmsClient.get({
    endpoint: 'articles',
    queries: { limit: 9999 }
  });
  const articles = data.contents;
  const sitemap = generateSiteMap(articles);
  const res = ctx.res;

  if (res) {
    res.setHeader('Content-Type', 'text/xml');
    console.info(sitemap);
    res.write(sitemap);
    res.end();
  }

  return {
    props: {}
  };
};

// eslint-disable-next-line import/no-default-export
export default function SitemapIndex() {
  return <></>;
}
