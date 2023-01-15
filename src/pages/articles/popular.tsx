import { Box, Container, Group, Loader, SimpleGrid, Title } from '@mantine/core';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ArticleCard } from '@/components/articleCard';
import { fetchPopularPosts } from '@/lib/ga';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';
import { PageSeo } from '../../components/seo';

type popularDatum = { path: string; readCount: number };
type Props = {
  articles: Article[];
  popularData: popularDatum[];
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await cmsClient.getList({
    endpoint: 'articles'
  });
  const popularData = await fetchPopularPosts('7daysAgo', 15);
  return {
    props: {
      articles: data.contents,
      popularData
    }
  };
};

const Popular: NextPage<Props> = ({ articles, popularData }: Props) => {
  const router = useRouter();

  if (router.isFallback || !articles) {
    return <Loader />;
  }

  const popularArticles: Article[] = popularData
    .map((pd: popularDatum) => {
      return articles.find((article: Article) => `/articles/${article.id}` === pd.path);
    })
    .filter((article): article is Exclude<typeof article, undefined> => article !== undefined)
    .slice(0, 12);

  return (
    <>
      <PageSeo
        description={`人気記事の一覧ページです。よく読まれている記事を一覧表示しています。`}
        title={'人気記事一覧'}
      />

      <Container>
        <Box>
          <Title align='center' mb={20} order={1} size='h2'>
            人気記事一覧
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
            {popularArticles.map((item: Article) => (
              <ArticleCard
                category={item.category}
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
export default Popular;
