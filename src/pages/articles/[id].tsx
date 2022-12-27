import { ParsedUrlQuery } from 'querystring';
import { Badge, Button, Container, Divider, Group, Loader, Text, Title, Box } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import m2h from 'zenn-markdown-html';
import { Mdx } from '@/components/markdown/mdx';
import { ArticleSeo } from '@/components/seo';
import { siteMetadata } from '@/config/siteMetadata';
import { cmsClient } from '@/lib/microcms';
import { Article as ArticleType } from '@/types/article';

type Props = {
  data: ArticleType;
  content: string;
  prevEntry: ArticleType;
  nextEntry: ArticleType;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Article: NextPage<Props> = ({ data, content, prevEntry, nextEntry }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    {
      /* TODO: Prepare fallback component*/
    }
    return <Loader>Loading...</Loader>;
  }

  return (
    <>
      <ArticleSeo
        modifiedAt={data.revisedAt}
        publishedAt={data.publishedAt}
        summary={''}
        title={data.title}
        url={`${siteMetadata.url}/articles/${data.id}`}
      />
      <Container>
        {data.category && (
          <>
            <Badge mb={10} radius='lg' variant='dot'>
              {data.category.name}
            </Badge>
          </>
        )}
        <Box mb={20}>
          <Text align='center' color='dimmed' mb={5}>
            {new Date(data.publishedAt).toLocaleDateString()}
          </Text>
          <Title align='center' order={1} size='h2'>
            {data.title}
          </Title>
        </Box>
        <Mdx content={content} />
        <Divider mb={40} mt={40} />
        <Group position='center'>
          <Button.Group>
            {prevEntry?.id && (
              <Button
                compact
                component={Link}
                href={`/articles/${prevEntry?.id}`}
                leftIcon={<IconChevronLeft />}
                mr={nextEntry?.id ? 10 : 0}
                type='button'
                variant='light'
              >
                前の記事
              </Button>
            )}
            {nextEntry?.id && (
              <Button
                compact
                component={Link}
                href={`/articles/${nextEntry?.id}`}
                rightIcon={<IconChevronRight />}
                type='button'
                variant='light'
              >
                次の記事
              </Button>
            )}
          </Button.Group>
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

  const data = await cmsClient
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
      filters: `publishedAt[less_than]${data.publishedAt}`
    }
  });
  const next = await cmsClient.get({
    endpoint: 'articles',
    queries: {
      limit: 1,
      orders: 'publishedAt',
      fields,
      filters: `publishedAt[greater_than]${data.publishedAt}`
    }
  });

  if (!data) {
    return {
      notFound: true
    };
  }

  const prevEntry = prev.contents[0] || {};
  const nextEntry = next.contents[0] || {};

  // TODO: Table of contents
  // TODO: Use next/link
  const markdown = await unified()
    .use(rehypeParse, {
      fragment: true
    })
    .use(rehypeSlug)
    .use(rehypeRemark)
    .use(remarkGfm)
    .use(remarkStringify)
    .process(String(data.content));

  return {
    props: {
      data,
      content: m2h(markdown.value as string),
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
