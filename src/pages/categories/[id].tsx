import { ParsedUrlQuery } from 'querystring';
import { Box, Container, Group, Loader, SimpleGrid, Title } from '@mantine/core';
import { NextPage, GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ArticleCard } from '@/components/articleCard';
import { PageSeo } from '@/components/seo';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';
import { Category } from '@/types/category';

type Props = {
  category: Category;
  articles: Article[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await cmsClient.getList({
    endpoint: 'categories',
    queries: { limit: 9999 }
  });
  const paths = data.contents.map((content: Category) => `/categories/${content.id}`);

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params
}): Promise<GetStaticPropsResult<Props>> => {
  if (!params?.id) throw new Error('params id not found');
  const id = params?.id;
  const category = await cmsClient
    .get({
      endpoint: 'categories',
      contentId: String(id)
    })
    .catch((err) => console.error(err));

  if (!category) {
    return {
      notFound: true
    };
  }

  const data = await cmsClient.getList({
    endpoint: 'articles',
    queries: {
      filters: `category[equals]${category.id}`,
      limit: 20
    }
  });
  const articles = data.contents;

  return {
    props: {
      category,
      articles
    }
  };
};

const Category: NextPage<Props> = ({ category, articles }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <PageSeo
        description={`${category.name}のページです。関連するカテゴリーの記事が一覧になっています。`}
        title={`${category.name}`}
      />
      <Container>
        <Box>
          <Title align='center' mb={20} order={1} size='h2'>
            {category.name}
          </Title>
        </Box>
        <Group position='center'>
          <SimpleGrid
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: 'md' },
              { maxWidth: 820, cols: 2, spacing: 'sm' },
              { maxWidth: 600, cols: 1, spacing: 'xs' }
            ]}
            cols={3}
            verticalSpacing='xs'
          >
            {articles.map((item: Article) => (
              <ArticleCard
                date={item.publishedAt}
                id={item.id}
                image={item.eyecatch?.url}
                key={item.id}
                title={item.title}
              />
            ))}
          </SimpleGrid>
        </Group>
      </Container>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default React.memo(Category);
