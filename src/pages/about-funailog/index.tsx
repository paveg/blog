import { Group, Title, Flex, Text, useMantineColorScheme } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';

const AboutFunailog: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <>
      <Group mb={40} position='center'>
        <Title order={1} size='h2'>
          フナイログについて
        </Title>
      </Group>
      <Group mb={40}>
        <Flex direction='column' gap='sm'>
          <Title order={2} size='h3'>
            買った後悔より、買わない後悔の方がきっと大きい。
          </Title>
          <Text color={colorScheme === 'light' ? 'dark' : 'gray.3'}>
            フナイログは、『ガジェット』を中心に、PCやデスク周辺の『仕事道具』や『乗り物のコト』を綴る個人メディアです。
            買ってよかったモノなど、フナイログの中の人の目線で紹介しています。
          </Text>
          <Text color={colorScheme === 'light' ? 'dark' : 'gray.3'}>
            ここで紹介するのは「シンプル」なモノや「気分を上げる」モノです。
            スタイリッシュでスマートなアイテムをたくさん紹介していきたいと思うので、気になるひとはぜひ記事を読んでみてくださいね。
          </Text>
        </Flex>
      </Group>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AboutFunailog;
