import { createStyles, Title, Text, Button, Container, Group } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120
    }
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32
    }
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5
  }
}));

const ServerError: FC = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Something bad just happened...</Title>
      <Text align='center' className={classes.description} color='gray.7' size='lg'>
        Our servers could not handle your request.
        <br />
        Don&apos;t worry, our development team was already notified.
        <br />
        Try refreshing the page.
      </Text>
      <Group position='center'>
        <Button component={Link} href='/' size='md' variant='subtle'>
          ホームへ戻る
        </Button>
      </Group>
    </Container>
  );
};

const Custom500: NextPage = () => {
  return <ServerError />;
};

// eslint-disable-next-line import/no-default-export
export default Custom500;
