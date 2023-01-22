import {
  Center,
  List,
  Paper,
  Text,
  Title,
  createStyles,
  useMantineColorScheme
} from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { ListPaper } from '@/components/article/listPaper';
import { CategoryBadge } from '@/components/category/badge';
import { FormattedDate } from '@/lib/date';
import { fetchPopularPosts } from '@/lib/ga';
import { cmsClient } from '@/lib/microcms';
import { objGroupBy } from '@/lib/utils';
import { Article } from '@/types/article';
import { Category } from '@/types/category';
import { PopularData } from '@/types/popularData';

type Props = {
  articles: Article[];
  categories: Category[];
  popularData: PopularData[];
};

const useStyles = createStyles(() => ({
  listText: {
    '&:hover': { textDecoration: 'underline' }
  }
}));

const Home: NextPage<Props> = ({ articles, categories, popularData }: Props) => {
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();

  const groupedArticles = objGroupBy(articles, (article: Article) => article.category.id);
  const newerArticles = articles.slice(0, 3);
  const popularArticles: Article[] = popularData
    .map((pd: PopularData) => {
      return articles.find((article: Article) => `/articles/${article.id}` === pd.path);
    })
    .filter((article): article is Exclude<typeof article, undefined> => article !== undefined)
    .slice(0, 3);
  return (
    <>
      <ListPaper
        articles={newerArticles}
        id='newer-articles'
        order={2}
        size={'h3'}
        title='新着記事'
      />
      <ListPaper
        articles={popularArticles}
        id='popular-articles'
        order={2}
        size={'h3'}
        title={
          <Text aria-label='Popular articles link' component={Link} href='/popular'>
            人気の記事
          </Text>
        }
      />
      <Paper id='articles' mb={20} p='lg' radius='lg' shadow='lg'>
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
      <Paper id='categories' mb={20} p='lg' radius='lg' shadow='lg'>
        <Center mb={20}>
          <Title order={2} size='h3'>
            カテゴリ一覧
          </Title>
        </Center>
        <List center listStyleType='none' size='sm' spacing='sm'>
          {Object.keys(groupedArticles).map((category: string) => (
            <List.Item key={category}>
              <Text
                className={classes.listText}
                color={colorScheme === 'light' ? 'dark' : 'gray.4'}
                component={Link}
                href={`/categories/${category}`}
                inline
                size='sm'
                weight={400}
              >
                {categories.find((cat: Category) => cat?.id === category)?.name} (
                {groupedArticles[category].length})
              </Text>
            </List.Item>
          ))}
        </List>
      </Paper>
    </>
  );
};

export const getStaticProps = async () => {
  const data = await cmsClient.getList({ endpoint: 'articles' });
  const categoryData = await cmsClient.getList({ endpoint: 'categories' });
  const popularData = await fetchPopularPosts('14daysAgo', 15);

  return {
    props: {
      articles: data.contents,
      categories: categoryData.contents,
      popularData
    }
  };
};

export default Home;
