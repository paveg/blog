import { Center, Group } from '@mantine/core';
import { IconBrandFacebook, IconBrandTwitter } from '@tabler/icons';
import React, { FC } from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { siteMetadata } from '@/config/siteMetadata';

type Props = {
  centered?: boolean;
  articleTitle: string;
  articleUrl: string;
};

export const ShareButtons: FC<Props> = ({ centered, articleTitle, articleUrl }) => {
  const shares = (
    <Group>
      <TwitterShareButton
        hashtags={[siteMetadata.title]}
        title={`${articleTitle} | ${siteMetadata.title}`}
        url={articleUrl}
      >
        <IconBrandTwitter />
      </TwitterShareButton>
      <FacebookShareButton hashtag={siteMetadata.title} title={articleTitle} url={articleUrl}>
        <IconBrandFacebook />
      </FacebookShareButton>
    </Group>
  );
  return <>{centered ? <Center>{shares}</Center> : shares}</>;
};
