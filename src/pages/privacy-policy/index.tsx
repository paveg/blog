import { Title, Group, Text, Flex } from '@mantine/core';
import { NextPage } from 'next';
import Link from 'next/link';
import React, { FC } from 'react';

const PrivacyPolicy: NextPage = () => {
  type TextLinkProps = { children: React.ReactNode; external?: boolean; href: string };
  const TextLink: FC<TextLinkProps> = ({ external, href, children }: TextLinkProps) => {
    return (
      <Text
        color='indigo'
        component={Link}
        href={href}
        rel={external ? 'noopener noreferrer' : ''}
        target={external ? '_blank' : ''}
      >
        {children}
      </Text>
    );
  };
  return (
    <>
      <Group mb={40} position='center'>
        <Title order={1} size='h2'>
          プライバシーポリシー
        </Title>
      </Group>
      <Group mb={40}>
        <Flex direction='column' gap='sm'>
          <Title order={2} size='h2'>
            Google Adsense について
          </Title>
          <Text color='dimmed'>
            当サイトはGoogle及びGoogleのパートナー（第三者配信事業者）の提供する広告を設置しております。その広告配信にはCookieを使用し、当サイトへの過去のアクセス情報に基づいて広告を配信します。
          </Text>
          <Text color='dimmed'>
            <TextLink
              external
              href={'https://support.google.com/searchads/answer/2839090?hl=ja&ref_topic=2473095'}
            >
              DoubleClick Cookie
            </TextLink>
            を使用することにより、GoogleやGoogleのパートナーは当サイトや他のサイトへのアクセス情報に基づいて、適切な広告を当サイト上でサイト利用者に表示できます。
          </Text>
          <Text color='dimmed'>
            サイト利用者は下記のGoogleアカウントの広告設定ページで、インタレスト
            ベースでの広告掲載に使用される DoubleClick Cookie を無効にできます。また
            <TextLink external href={'https://www.aboutads.info/'}>
              www.aboutads.info
            </TextLink>
            のページにアクセスして頂き、インタレスト
            ベースでの広告掲載に使用される第三者配信事業者のCookieを無効にできます。
          </Text>
          <Text color='dimmed'>
            その他、Googleの広告におけるCookieの取り扱い詳細については、
            <TextLink external href={'https://policies.google.com/technologies/ads?gl=jp'}>
              Googleのポリシーと規約ページ
            </TextLink>
            をご覧ください。
          </Text>
        </Flex>
      </Group>
      <Group mb={40}>
        <Flex direction='column' gap='sm'>
          <Title order={2} size='h2'>
            アフィリエイトプログラムについて
          </Title>
          <Text color='dimmed'>準備中</Text>
        </Flex>
      </Group>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default PrivacyPolicy;
