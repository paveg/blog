import { ParsedUrlQuery } from 'querystring';
import { Alert, Box, Container, Loader, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { NextPage, GetStaticPaths, GetStaticPropsContext, GetStaticProps } from 'next';
import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useRouter } from 'next/router';
import React from 'react';
import { CategoryBadge } from '@/components/category/badge';
import { Mdx } from '@/components/mdx';
import { m2h } from '@/lib/mdx2html';
import { cmsClient } from '@/lib/microcms';
import { Article as ArticleType } from '@/types/article';

type Props = {
  article: ArticleType;
  mdxSource: MDXRemoteSerializeResult;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Preview: NextPage<Props> = ({ article, mdxSource }: Props) => {
  const router = useRouter();

  if (router.isFallback || !article) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        <CategoryBadge bottomOffset category={article.category} />
        <Box mb={20}>
          <Alert
            color='red'
            icon={<IconAlertCircle />}
            mb={20}
            radius='md'
            title='Preview Mode'
            variant='filled'
          >
            このページはプレビューページです。更新が完了したら投稿してください。
          </Alert>
          <Title align='center' mb={20} order={1} size='h2'>
            {article.title}
          </Title>
        </Box>
        <Mdx {...mdxSource} />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    fallback: 'blocking',
    paths: []
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkDraftKey = (item: any): item is { draftKey: string } =>
  !!(item?.draftKey && typeof item.draftKey === 'string');

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
  previewData
}: GetStaticPropsContext) => {
  if (!params?.id) throw new Error('params id not found');
  if (!previewData) throw new Error('previewData not found');

  const id = params?.id;
  const draftData = checkDraftKey(previewData) ? { draftKey: previewData?.draftKey } : {};

  const article = await cmsClient
    .get({
      endpoint: 'articles',
      contentId: String(id),
      queries: {
        draftKey: draftData.draftKey
      }
    })
    .catch((err) => console.error(err));
  const mdxSource = await m2h(article.content);

  return {
    props: {
      article: article,
      mdxSource: mdxSource
    },
    revalidate: 5
  };
};

// eslint-disable-next-line import/no-default-export
export default Preview;
