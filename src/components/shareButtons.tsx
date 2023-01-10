import { Center, Group } from '@mantine/core';
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

export const ShareButtons: FC<Props> = ({ centered, articleTitle, articleUrl }) => {
  const title = `${articleTitle} | ${siteMetadata.title}`;
  const hashtags = [siteMetadata.title];
  const shares = (
    <Group mb={20}>
      <TwitterShareButton hashtags={hashtags} title={title} url={articleUrl}>
        <TwitterIcon round size={28} />
      </TwitterShareButton>
      <FacebookShareButton hashtag={siteMetadata.title} title={title} url={articleUrl}>
        <FacebookIcon round size={28} />
      </FacebookShareButton>
      <HatenaShareButton title={title} url={articleUrl}>
        <HatenaIcon round size={28} />
      </HatenaShareButton>
      <LineShareButton title={title} url={articleUrl}>
        <LineIcon round size={28} />
      </LineShareButton>
    </Group>
  );
  return <>{centered ? <Center>{shares}</Center> : shares}</>;
};
