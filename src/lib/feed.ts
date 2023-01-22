import { Feed, Author } from 'feed';
import { marked } from 'marked';
import { siteMetadata } from '@/config/siteMetadata';
import { TimezonedDate } from '@/lib/date';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';
import { FeedType } from '@/types/feed';

export const generateRssFeed = async (type: FeedType): Promise<string> => {
  const author: Author = {
    name: siteMetadata.author as string,
    email: siteMetadata.email,
    link: siteMetadata.social.twitter.url
  };

  const feed = new Feed({
    title: 'フナイログ',
    copyright: 'All Rights Reserved 2022, フナイログ',
    description: siteMetadata.description,
    id: `${siteMetadata.url}/`,
    link: siteMetadata.url,
    feedLinks: {
      rss: `${siteMetadata.url}/feed`,
      json: `${siteMetadata.url}/json`,
      atom: `${siteMetadata.url}/atom`
    },
    favicon: '/favicon.ico',
    language: 'ja',
    author: author
  });

  const data = await cmsClient.getList({
    endpoint: 'articles',
    queries: { limit: 9999 }
  });
  const articles = data.contents;

  articles.forEach((article: Article) => {
    feed.addItem({
      title: article.title,
      id: `${siteMetadata.url}/articles/${article.id}`,
      link: `${siteMetadata.url}/articles/${article.id}`,
      content: marked(article.content),
      description: article.summary,
      author: [author],
      date: TimezonedDate(article.publishedAt),
      image: article.eyecatch.url ?? ''
    });
  });

  switch (type) {
    case 'rss':
      return feed.rss2();
    case 'atom':
      return feed.atom1();
    case 'json':
      return feed.json1();
  }
};
