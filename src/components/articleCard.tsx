import { createStyles, Card, Image, Text, Group } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { FormattedDate } from '@/lib/date';
import { Category } from '@/types/category';
import { CategoryBadge } from './category/badge';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2
  },

  body: {
    padding: theme.spacing.md
  }
}));

interface ArticleCardProps {
  id: string;
  image?: string;
  category?: Category;
  title: string;
  date: string;
}

// TODO: replace
const DEFAULT_EYECATCH =
  'https://images.microcms-assets.io/assets/3ab7834809eb4654a5239e79fba895de/74e5c9a9c80b48ce9c96362cbedcf2ef/blog-template.png';

export const ArticleCard: FC<ArticleCardProps> = ({
  id,
  image,
  category,
  title,
  date
}: ArticleCardProps) => {
  const { classes } = useStyles();
  const d = FormattedDate(date);
  console.info(category);
  return (
    <Card
      className={classes.card}
      component={Link}
      href={`/articles/${id}`}
      p={0}
      radius='md'
      withBorder
    >
      <Group noWrap spacing={0}>
        <Group>
          <Image
            alt='eyecatch'
            fit='cover'
            height={200}
            src={image ? image : DEFAULT_EYECATCH}
            width={140}
          />
        </Group>
        <div className={classes.body}>
          <CategoryBadge category={category} />
          <Text className={classes.title} mb='md' mt='xs'>
            {title}
          </Text>
          <Group noWrap spacing='xs'>
            <Text color='gray' size='xs'>
              {d}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};
