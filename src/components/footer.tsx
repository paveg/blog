import { createStyles, Container, Group, Anchor, Text } from '@mantine/core';
import Link from 'next/link';
import React, { FC } from 'react';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 120,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column'
    }
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md
    }
  }
}));

interface FooterProps {
  links: { link: string; label: string }[];
}

export const Footer: FC<FooterProps> = ({ links }: FooterProps) => {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor color='dimmed' component={Link} href={link.link} key={link.label} size='sm'>
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </Container>
      <Text align='center' color='dimmed' size='xs'>
        Copyright © Ryota Ikezawa All Rights Reserved.
      </Text>
    </div>
  );
};
