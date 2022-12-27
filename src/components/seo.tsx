import { NextSeo, ArticleJsonLd } from 'next-seo';
import React, { FC } from 'react';
import { siteMetadata } from '@/config/siteMetadata';

type PageSeoProps = {
  title: string;
  description: string;
  url: string;
};

export const PageSeo: FC<PageSeoProps> = ({ title, description, url }: PageSeoProps) => {
  return (
    <NextSeo
      canonical={url}
      description={description}
      openGraph={{
        url,
        title,
        description
      }}
      title={`${title} | ${siteMetadata.title}`}
    />
  );
};

type ArticleSeoProps = {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  modifiedAt: string;
};

export const ArticleSeo: FC<ArticleSeoProps> = ({
  title,
  summary,
  url,
  publishedAt,
  modifiedAt
}: ArticleSeoProps) => {
  // TODO: Add images
  const publishedTime = new Date(publishedAt).toISOString();
  const modifiedTime = new Date(modifiedAt || publishedAt).toISOString();
  return (
    <>
      <NextSeo
        canonical={url}
        description={summary}
        openGraph={{
          type: 'article',
          article: {
            publishedTime,
            modifiedTime
          },
          url,
          title,
          description: summary
        }}
        title={`${title} | ${siteMetadata.title}`}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={modifiedTime}
        datePublished={publishedTime}
        description={summary}
        images={[]}
        publisherName={siteMetadata.author}
        title={title}
        url={url}
      />
    </>
  );
};
