import { NextSeo, ArticleJsonLd } from 'next-seo';
import { OpenGraphMedia } from 'next-seo/lib/types';
import React, { FC } from 'react';
import { siteMetadata } from '@/config/siteMetadata';
import { FormattedISODate } from '@/lib/date';
import { Image } from '@/types/image';

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
  summary?: string;
  url: string;
  publishedAt: string;
  modifiedAt: string;
  image?: Image;
};

export const ArticleSeo: FC<ArticleSeoProps> = ({
  title,
  summary,
  url,
  publishedAt,
  modifiedAt,
  image
}: ArticleSeoProps) => {
  const publishedTime = FormattedISODate(publishedAt);
  const modifiedTime = FormattedISODate(modifiedAt || publishedAt);
  const openGraphImages: ReadonlyArray<OpenGraphMedia> = image
    ? [{ url: image.url, width: image.width, height: image.height, type: 'image/png' }]
    : [{ url: siteMetadata.openGraph.defaultUrl }];
  return (
    <>
      <NextSeo
        canonical={url}
        description={summary || siteMetadata.description}
        openGraph={{
          type: 'article',
          article: {
            publishedTime,
            modifiedTime
          },
          url,
          title,
          description: summary || siteMetadata.description,
          images: openGraphImages
        }}
        title={`${title} | ${siteMetadata.title}`}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={modifiedTime}
        datePublished={publishedTime}
        description={summary || siteMetadata.description}
        images={image ? [image.url] : [siteMetadata.openGraph.defaultUrl]}
        publisherName={siteMetadata.author}
        title={title}
        url={url}
      />
    </>
  );
};
