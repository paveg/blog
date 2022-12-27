import {
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Paper,
  Transition,
  Anchor,
  Text,
  Burger
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none'
    }
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none'
    }
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none'
    }
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md
    }
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color
    }
  }
}));

interface HeaderProps {
  links: { link: string; label: string }[];
}

export const Header: FC<HeaderProps> = ({ links }: HeaderProps) => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => (
    <Anchor
      className={cx(classes.link, { [classes.linkActive]: router.asPath === link.link })}
      component={Link}
      href={link.link}
      key={link.label}
      onClick={close}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <MantineHeader className={classes.root} height={HEADER_HEIGHT} mb={40}>
      <Container className={classes.header}>
        <Text component={Link} fw={700} href='/' rel='home' size='lg'>
          フナイログ
        </Text>
        <Group>
          <Group className={classes.links} spacing={5}>
            {items}
          </Group>
          {/* TODO: Implement search functionality
            <Autocomplete
              className={classes.search}
              data={['Technology', 'Gadget', 'Programming']}
              icon={<IconSearch size={16} stroke={1.5} />}
              placeholder='Search'
            />
            */}
        </Group>
        <Burger className={classes.burger} onClick={toggle} opened={opened} size='sm' />
        <Transition duration={200} mounted={opened} transition='pop-top-right'>
          {(styles) => (
            <Paper className={classes.dropdown} style={styles} withBorder>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </MantineHeader>
  );
};
