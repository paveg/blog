import { ParsedUrlQuery } from 'querystring';
import { Container, Title } from '@mantine/core';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';
import { Mdx } from '../../components/markdown/mdx';
import { cmsClient } from '../../lib/microcms';
import { Article as ArticleType } from '../../types/article';

type Props = {
  data: ArticleType;
  body: string;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Article: NextPage<Props> = ({ data, body }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    {
      /* TODO: Prepare fallback component*/
    }
    return <>Loading...</>;
  }

  return (
    <Container>
      <Title order={1}>{data.title}</Title>
      <Mdx markdown={body} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}): Promise<GetStaticPropsResult<Props>> => {
  if (!params?.id) throw new Error('params id not found');
  const id = params?.id;

  const data = await cmsClient
    .get({
      endpoint: 'blogs',
      contentId: String(id)
    })
    .catch((err) => console.error(err));

  if (!data) {
    return {
      notFound: true
    };
  }
  const markdown = await unified()
    .use(rehypeParse)
    .use(rehypeRemark)
    .use(remarkStringify)
    .process(data.content);

  return {
    props: {
      data,
      body: markdown.value as string
    }
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await cmsClient.get({
    endpoint: 'blogs',
    queries: { limit: 9999 }
  });
  const paths = data.contents.map((content: ArticleType) => `/articles/${content.id}`);

  return { paths, fallback: true };
};

// eslint-disable-next-line import/no-default-export
export default React.memo(Article);
