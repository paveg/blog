import {
  Center,
  Group,
  List,
  Paper,
  SimpleGrid,
  Text,
  Title,
  createStyles,
  useMantineColorScheme
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { ArticleCard } from '@/components/articleCard';
import { CategoryBadge } from '@/components/category/badge';
import { FormattedDate } from '@/lib/date';
import { cmsClient } from '@/lib/microcms';
import { Article } from '@/types/article';

type Props = {
  articles: Article[];
};

const useStyles = createStyles(() => ({
  listText: {
    '&:hover': { textDecoration: 'underline' }
  }
}));

const Home: NextPage<Props> = ({ articles }: Props) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();

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
      </Paper>
      <Paper mb={20} p='lg' radius='lg' shadow='lg'>
        <Center mb={20}>
          <Title order={2} size='h3'>
            記事一覧
          </Title>
        </Center>
        <List center size='sm' spacing='sm'>
          {articles.map((item: Article) => (
            <List.Item icon={<CategoryBadge category={item.category} small />} key={item.id}>
              <Text
                className={classes.listText}
                color={colorScheme === 'light' ? 'dark' : 'gray.4'}
                component={Link}
                href={`/articles/${item.id}`}
                inline
                weight={400}
              >
                {item.title}
                <Text inline ml={10} size='xs' span>
                  ({FormattedDate(item.publishedAt)})
                </Text>
              </Text>
            </List.Item>
          ))}
        </List>
      </Paper>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await cmsClient.get({ endpoint: 'articles' });

  return {
    props: {
      articles: data.contents
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default Home;
