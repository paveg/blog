import { Center, Group, Paper, SimpleGrid, Title, TitleProps } from '@mantine/core';
import React, { FC } from 'react';
import { ArticleCard } from '@/components/molecules/articleCard';
import { Article } from '@/types/article';

type Props = {
  title: string | React.ReactNode;
  id: string;
  articles: Article[];
  noBadge?: boolean;
} & Omit<TitleProps, 'title'>;

export const ListPaper: FC<Props> = ({ noBadge, id, title, articles, order, size }: Props) => {
  return (
    <Paper id={id} mb={20} p='lg' radius='lg' shadow='lg'>
      <Center mb={10}>
        <Title align='center' mb={10} order={order ? order : 1} size={size ? size : 'h2'}>
          {title}
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
              category={noBadge ? undefined : item.category}
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
  );
};
