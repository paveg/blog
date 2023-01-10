import { Feed, Author } from 'feed';
import m2h from 'zenn-markdown-html';
import { siteMetadata } from '@/config/siteMetadata';
import { Article } from '@/types/article';
import { TimezonedDate } from './date';
import { cmsClient } from './microcms';

export const generateRssFeed = async (): Promise<string> => {
  const author: Author = {
    name: siteMetadata.author as string,
    email: siteMetadata.email,
    link: siteMetadata.social.twitter.url
  };

  const feed = new Feed({
    title: 'フナイログ',
    copyright: 'All Rights Reserved 2023, フナイログ',
    description: siteMetadata.description,
    id: siteMetadata.url,
    link: siteMetadata.url,
    favicon: '/favicon.ico',
    language: 'ja',
    author: author
  });

  const data = await cmsClient.get({
    endpoint: 'articles',
    queries: { limit: 9999 }
  });
  const articles = data.contents;

  articles.forEach((article: Article) => {
    feed.addItem({
      title: article.title,
      id: `${siteMetadata.url}/articles/${article.id}`,
      link: `${siteMetadata.url}/articles/${article.id}`,
      content: m2h(article.content),
      description: article.summary,
      author: [author],
      date: TimezonedDate(article.publishedAt),
      image: article.eyecatch.url ?? ''
    });
  });

  return feed.rss2();
};
