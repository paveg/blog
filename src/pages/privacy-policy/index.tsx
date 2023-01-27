import { Title, Group, Text, Flex, useMantineColorScheme } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { TextLink } from '@/components/atoms/textLink';
import { PageSeo } from '@/components/seo';

const PrivacyPolicy: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();

  return (
    <>
      <PageSeo
        description='フナイログの「プライバシーポリシー」ページです。ここではブログにおけるアクセス情報の取り扱いなどについて記述しています。'
        title='プライバシーポリシー'
      />
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
          <Text color={colorScheme === 'light' ? 'gray.7' : 'gray.5'}>
            当サイトはGoogle及びGoogleのパートナー（第三者配信事業者）の提供する広告を設置しております。その広告配信にはCookieを使用し、当サイトへの過去のアクセス情報に基づいて広告を配信します。
          </Text>
          <Text color={colorScheme === 'light' ? 'gray.7' : 'gray.5'}>
            <TextLink
              external
              href={'https://support.google.com/searchads/answer/2839090?hl=ja&ref_topic=2473095'}
            >
              DoubleClick Cookie
            </TextLink>
            を使用することにより、GoogleやGoogleのパートナーは当サイトや他のサイトへのアクセス情報に基づいて、適切な広告を当サイト上でサイト利用者に表示できます。
          </Text>
          <Text color={colorScheme === 'light' ? 'gray.7' : 'gray.5'}>
            サイト利用者は下記のGoogleアカウントの広告設定ページで、インタレスト
            ベースでの広告掲載に使用される DoubleClick Cookie を無効にできます。また
            <TextLink external href={'https://www.aboutads.info/'}>
              www.aboutads.info
            </TextLink>
            のページにアクセスして頂き、インタレスト
            ベースでの広告掲載に使用される第三者配信事業者のCookieを無効にできます。
          </Text>
          <Text color={colorScheme === 'light' ? 'gray.7' : 'gray.5'}>
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
          <Text color={colorScheme === 'light' ? 'gray.7' : 'gray.5'}>準備中</Text>
        </Flex>
      </Group>
    </>
  );
};

export default PrivacyPolicy;
