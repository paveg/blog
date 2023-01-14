import { createStyles, Container, Group, Anchor, Text } from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube
} from '@tabler/icons';
import Link from 'next/link';
import React, { FC } from 'react';
import { CustomActionIcon } from '@/components/parts/customActionIcon';
import { siteMetadata } from '@/config/siteMetadata';

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: 100,
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
    <Anchor color='gray.7' component={Link} href={link.link} key={link.label} size='xs'>
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
        <Group className={classes.links} noWrap position='right' spacing={0}>
          <CustomActionIcon
            Icon={<IconBrandTwitter size={18} stroke={1.5} />}
            alt='Twitterへのリンクボタン'
            external
            href={siteMetadata.social.twitter.url}
            size='lg'
          />
          <CustomActionIcon
            Icon={<IconBrandYoutube size={18} stroke={1.5} />}
            alt='YouTubeへのリンクボタン'
            external
            href={siteMetadata.social.youtube.url}
            size='lg'
          />
          <CustomActionIcon
            Icon={<IconBrandInstagram size={18} stroke={1.5} />}
            alt='Instagramへのリンクボタン'
            external
            href={siteMetadata.social.instagram.url}
            size='lg'
          />
          <CustomActionIcon
            Icon={<IconBrandGithub size={18} stroke={1.5} />}
            alt='GitHubへのリンクボタン'
            external
            href={siteMetadata.repositoryUrl}
            size='lg'
          />
        </Group>
      </Container>
      <Text align='center' color='gray.7' mb={20} size='xs'>
        © 2022 フナイログ
      </Text>
    </div>
  );
};
