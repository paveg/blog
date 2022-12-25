import { createStyles, Container, Group, Anchor } from '@mantine/core';
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
    <Link href={link.link} key={link.label} passHref>
      <Anchor color='dimmed' key={link.label} size='sm'>
        {link.label}
      </Anchor>
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
};
