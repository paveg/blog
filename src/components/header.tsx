import {
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Paper,
  Transition,
  Anchor,
  Text,
  Title,
  Burger
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { ColorSchemaToggle } from '@/components/parts/colorSchemaToggle';
import { siteMetadata } from '@/config/siteMetadata';

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

  smallDevice: {
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
        {router.asPath === '/' ? (
          <Text
            component={Title}
            fw={700}
            size='lg'
            style={{
              pointerEvents: 'none'
            }}
          >
            {siteMetadata.title}
          </Text>
        ) : (
          <Text component={Link} fw={700} href='/' rel='home' size='lg'>
            {siteMetadata.title}
          </Text>
        )}
        <Group>
          <Group className={classes.links} spacing={5}>
            {items}
            <ColorSchemaToggle />
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
        <Group className={classes.smallDevice}>
          <ColorSchemaToggle />
          <Burger
            aria-label={`メニューを${opened ? '閉じる' : '開ける'}`}
            onClick={toggle}
            opened={opened}
            size='sm'
          />
        </Group>
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
