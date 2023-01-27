import { Group, Title, Center } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { ContactForm } from '@/components/molecules/contactForm';
import { PageSeo } from '@/components/seo';

const Contact: NextPage = () => {
  return (
    <>
      <PageSeo
        description='フナイログの「お問い合わせ」ページです。ここでは当ブログに関するお問い合わせを行うことができます。'
        title='お問い合わせ'
      />
      <Group mb={20} position='center'>
        <Title order={1} size='h2'>
          お問い合わせ
        </Title>
      </Group>
      <Center>
        <ContactForm />
      </Center>
    </>
  );
};

export default Contact;
