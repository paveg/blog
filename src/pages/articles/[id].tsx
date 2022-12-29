import { ParsedUrlQuery } from 'querystring';
import { Badge, Container, Divider, Group, Loader, Text, Title, Box } from '@mantine/core';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import m2h from 'zenn-markdown-html';
import { SideArticleButton } from '@/components/article/sideArticleButton';
import { Mdx } from '@/components/markdown/mdx';
import { ArticleSeo } from '@/components/seo';
import { siteMetadata } from '@/config/siteMetadata';
import { cmsClient } from '@/lib/microcms';
import { Article as ArticleType } from '@/types/article';

type Props = {
  article: ArticleType;
  mdSource: string;
  prevEntry: ArticleType;
  nextEntry: ArticleType;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Article: NextPage<Props> = ({ article, mdSource, prevEntry, nextEntry }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  const date = new Date(article.publishedAt).toLocaleDateString();

  return (
    <>
      <ArticleSeo
        image={article.eyecatch}
        modifiedAt={article.revisedAt}
        publishedAt={article.publishedAt}
        title={article.title}
        url={`${siteMetadata.url}/articles/${article.id}`}
      />
      <Container>
        {article.category && (
          <>
            <Badge mb={10} radius='lg' variant='dot'>
              {article.category.name}
            </Badge>
          </>
        )}
        <Box mb={20}>
          <Text align='center' color='dimmed' mb={5}>
            {date}
          </Text>
          <Title align='center' mb={20} order={1} size='h2'>
            {article.title}
          </Title>
          {article.eyecatch && (
            <Image
              alt='eyecatch'
              height={article.eyecatch.height}
              src={article.eyecatch.url}
              width={article.eyecatch.width}
            />
          )}
        </Box>
        <Mdx content={mdSource} />
        <Divider mb={20} mt={40} variant='dashed' />
        <Group position='center'>
          <SideArticleButton nextEntry={nextEntry} prevEntry={prevEntry} />
        </Group>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}): Promise<GetStaticPropsResult<Props>> => {
  if (!params?.id) throw new Error('params id not found');
  const id = params?.id;

  const article = await cmsClient
    .get({
      endpoint: 'articles',
      contentId: String(id)
    })
    .catch((err) => console.error(err));

  const fields = 'id,title,image,publishedAt';
  const prev = await cmsClient.get({
    endpoint: 'articles',
    queries: {
      limit: 1,
      orders: '-publishedAt',
      fields,
      filters: `publishedAt[less_than]${article.publishedAt}`
    }
  });
  const next = await cmsClient.get({
    endpoint: 'articles',
    queries: {
      limit: 1,
      orders: 'publishedAt',
      fields,
      filters: `publishedAt[greater_than]${article.publishedAt}`
    }
  });

  if (!article) {
    return {
      notFound: true
    };
  }

  const prevEntry = prev.contents[0] || {};
  const nextEntry = next.contents[0] || {};

  const mdSource = m2h(String(article.content));

  return {
    props: {
      article,
      mdSource,
      prevEntry,
      nextEntry
    }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await cmsClient.get({
    endpoint: 'articles',
    queries: { limit: 9999 }
  });
  const paths = data.contents.map((content: ArticleType) => `/articles/${content.id}`);

  return { paths, fallback: true };
};

// eslint-disable-next-line import/no-default-export
export default React.memo(Article);
