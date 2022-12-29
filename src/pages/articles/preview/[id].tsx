import { ParsedUrlQuery } from 'querystring';
import { Alert, Badge, Box, Container, Loader, Title } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';
import m2h from 'zenn-markdown-html';
import { Mdx } from '@/components/markdown/mdx';
import { cmsClient } from '@/lib/microcms';
import { Article as ArticleType } from '@/types/article';

type Props = {
  article: ArticleType;
  mdSource: string;
};

interface Params extends ParsedUrlQuery {
  id: string;
}

const Preview: NextPage<Props> = ({ article, mdSource }: Props) => {
  const router = useRouter();

  if (router.isFallback || !article) {
    return <Loader />;
  }

  return (
    <>
      <Container>
        {article.category && (
          <Badge mb={10} radius='lg' variant='dot'>
            {article.category.name}
          </Badge>
        )}
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
        <Mdx content={mdSource} />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await cmsClient.get({
    endpoint: 'articles',
    queries: { limit: 10 }
  });
  const paths = data.contents.map((content: ArticleType) => `/articles/preview/${content.id}`);

  return { paths, fallback: true };
};

export const getStaticProps = async (context) => {
  if (!context.params?.id) throw new Error('params id not found');
  const id = context.params?.id;
  const draftKey = context.previewData?.draftKey;

  const article = await cmsClient
    .get({
      endpoint: 'articles',
      contentId: String(id),
      queries: {
        draftKey: draftKey
      }
    })
    .catch((err) => console.error(err));
  const mdSource = m2h(String(article.content));

  return {
    props: {
      article: article,
      mdSource: mdSource
    },
    revalidate: 2
  };
};

// eslint-disable-next-line import/no-default-export
export default Preview;
