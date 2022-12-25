import { createStyles, Card, Image, Avatar, Text, Group } from '@mantine/core';
import { FC } from 'react';

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
  image: string;
  category: string;
  title: string;
  date: string;
}

export const ArticleCard: FC<ArticleCardProps> = ({
  image,
  category,
  title,
  date
}: ArticleCardVerticalProps) => {
  const { classes } = useStyles();
  return (
    <Card withBorder radius='md' p={0} className={classes.card}>
      <Group noWrap spacing={0}>
        <Image src={image} height={140} width={140} />
        <div className={classes.body}>
          <Text transform='uppercase' color='dimmed' weight={700} size='xs'>
            {category}
          </Text>
          <Text className={classes.title} mt='xs' mb='md'>
            {title}
          </Text>
          <Group noWrap spacing='xs'>
            <Text size='xs' color='dimmed'>
              {date}
            </Text>
          </Group>
        </div>
      </Group>
    </Card>
  );
};
