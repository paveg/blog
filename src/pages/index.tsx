import { Center, Group, Paper, SimpleGrid, Title } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { ArticleCard } from '@/components/articleCard';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }: Props) => {
  const newerArticles = articles.slice(0, 3);
  return (
    <>
      <Paper mb={20} p='lg' radius='lg' shadow='lg'>
        <Center mb={10}>
          <Title order={2} size='h3'>
            新着記事
          </Title>
        </Center>
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
            {newerArticles.map((item: Article) => (
              <ArticleCard
                category={item.category?.name}
                date={item.publishedAt}
                id={item.id}
                image={item.eyecatch?.url}
                key={item.id}
                title={item.title}
              />
            ))}
          </SimpleGrid>
        </Group>
      </Paper>
      <Paper mb={20} p='lg' radius='lg' shadow='lg'>
        <Center mb={10}>
          <Title order={2} size='h3'>
            記事一覧
          </Title>
        </Center>
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
                category={item.category?.name}
                date={item.publishedAt}
                id={item.id}
                image={item.eyecatch?.url}
                key={item.id}
                title={item.title}
              />
            ))}
          </SimpleGrid>
        </Group>
      </Paper>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await cmsClient.get({ endpoint: 'blogs' });

  return {
    props: {
      articles: data.contents
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default Home;
