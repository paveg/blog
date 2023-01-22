import { Center, Group, Stack, Text, createStyles } from '@mantine/core';
import React, { FC } from 'react';
import {
  FacebookShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  TwitterShareButton,
  HatenaIcon,
  LineShareButton,
  LineIcon
} from 'react-share';
import { siteMetadata } from '@/config/siteMetadata';

type Props = {
  centered?: boolean;
  articleTitle: string;
  articleUrl: string;
};

const useStyles = createStyles((theme) => ({
  share: {
    'circle:not(:hover)': {
      fill: theme.colorScheme === 'light' ? theme.colors.gray[7] : theme.colors.gray[6]
    }
  }
}));

export const ShareButtons: FC<Props> = ({ centered, articleTitle, articleUrl }) => {
  const { classes } = useStyles();
  const title = `${articleTitle} | ${siteMetadata.title}`;
  const hashtags = [siteMetadata.title];
  const shares = (
    <Stack mb={20}>
      <Text align='center' fw='700' transform='uppercase'>
        Share
      </Text>
      <Group noWrap position='center'>
        <TwitterShareButton hashtags={hashtags} title={title} url={articleUrl}>
          <TwitterIcon className={classes.share} round size={32} />
        </TwitterShareButton>
        <FacebookShareButton hashtag={siteMetadata.title} title={title} url={articleUrl}>
          <FacebookIcon className={classes.share} round size={32} />
        </FacebookShareButton>
        <HatenaShareButton title={title} url={articleUrl}>
          <HatenaIcon className={classes.share} round size={32} />
        </HatenaShareButton>
        <LineShareButton title={title} url={articleUrl}>
          <LineIcon className={classes.share} round size={32} />
        </LineShareButton>
      </Group>
    </Stack>
  );
  return <>{centered ? <Center>{shares}</Center> : shares}</>;
};
