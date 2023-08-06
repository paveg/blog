import { Group, Title, Flex, Text, useMantineColorScheme, Stepper, List } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { PageSeo } from '@/components/seo';

const AboutFunailog: NextPage = () => {
  const { colorScheme } = useMantineColorScheme();
  const birthday = {
    year: 1991,
    month: 12,
    date: 29
  };
  const calculateAge = () => {
    const today = new Date();
    const currentYearBirthday = new Date(today.getFullYear(), birthday.month - 1, birthday.date);
    let age;
    age = today.getFullYear() - birthday.year;
    if (today < currentYearBirthday) {
      age--;
    }

    return age;
  };

  const realAge = calculateAge();
  const text1 =
    'フナイログは、『ガジェット』を中心に、PCやデスク周辺の『仕事道具』や『乗り物のコト』を綴る個人メディアです。買ってよかったモノなど、フナイログの中の人の目線で紹介しています。';
  return (
    <>
      <PageSeo description={text1} title='フナイログについて' />
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
          <Text color={colorScheme === 'light' ? 'dark' : 'gray.3'}>{text1}</Text>
          <Text color={colorScheme === 'light' ? 'dark' : 'gray.3'}>
            ここで紹介するのは「シンプル」なモノや「気分を上げる」モノです。
            スタイリッシュでスマートなアイテムをたくさん紹介していきたいと思うので、気になるひとはぜひ記事を読んでみてくださいね。
          </Text>
        </Flex>
      </Group>
      <Group>
        <Flex direction='column' gap='sm'>
          <Title order={2} size='h3'>
            アバウトミー
          </Title>
          <Text>
            {birthday.year}年{birthday.month}月{birthday.date}日生まれの{realAge}
            歳。ソフトウェアエンジニア。
          </Text>
          <Title order={3} size='h3'>
            経歴
          </Title>
          <Stepper active={2} iconSize={24} orientation='vertical'>
            <Stepper.Step
              description={
                <List listStyleType='none' spacing='lg'>
                  <List.Item>
                    <Text fw='700'>Network Engineer (Full-Time)@XTOP technology.inc</Text>
                  </List.Item>
                  <List withPadding>
                    <List.Item>オンプレミスネットワークをAWSへ移行する詳細設計業務</List.Item>
                  </List>
                </List>
              }
              label='2015.04 - 2015.10'
            />
            <Stepper.Step
              description={
                <List listStyleType='none'>
                  <List.Item>
                    <Text fw='700'>Application Engineer (Part-Time)@ACALL K.K.</Text>
                  </List.Item>
                  <List spacing='xs' withPadding>
                    <List.Item>Ruby runtimeの更新</List.Item>
                    <List.Item>Ruby on Railsの更新</List.Item>
                    <List.Item>PaperclipからActiveStorageへのライブラリ移行</List.Item>
                  </List>
                </List>
              }
              label='2018.08 - 2019.08'
            />
            <Stepper.Step
              description={
                <List listStyleType='none'>
                  <List.Item>
                    <Text fw='700'>Software Engineer (Full-Time)@Freee K.K.</Text>
                  </List.Item>
                  <List spacing='xs' withPadding>
                    <List.Item>
                      2015.11 - 2018.07:{' '}
                      <Text fw={700} span>
                        Developer
                      </Text>
                      @AccountAggregationTeam
                    </List.Item>
                    <List.Item>
                      2018.08 - 2019.05:{' '}
                      <Text fw={700} span>
                        Developer
                      </Text>
                      @BankAccount development
                    </List.Item>
                    <List.Item>
                      2019.06 - 2022.06:{' '}
                      <Text fw={700} span>
                        Developer
                      </Text>
                      @Financial Engineering
                    </List.Item>
                    <List.Item>
                      2022.07 - Present:{' '}
                      <Text fw={700} span>
                        TechLead
                      </Text>
                      @Global Engineering
                    </List.Item>
                  </List>
                </List>
              }
              label='2015.11 - Present'
            />
            <Stepper.Step description='To be determined' label='Future' />
          </Stepper>
        </Flex>
      </Group>
    </>
  );
};

export default AboutFunailog;
