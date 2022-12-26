import { createStyles, Card, Image, Text, Group } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';

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
  image: string;
  category: string;
  title: string;
  date: string;
}

export const ArticleCard: FC<ArticleCardProps> = ({
  id,
  image,
  category,
  title,
  date
}: ArticleCardProps) => {
  const { classes } = useStyles();
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
        <Image height={140} src={image} width={140} />
        <div className={classes.body}>
          <Text color='dimmed' size='xs' transform='uppercase' weight={700}>
            {category}
          </Text>
          <Text className={classes.title} mb='md' mt='xs'>
            {title}
          </Text>
          <Group noWrap spacing='xs'>
            <Text color='dimmed' size='xs'>
              {date}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};
