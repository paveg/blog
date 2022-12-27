import { Group, Title, Center } from '@mantine/core';
import { NextPage } from 'next';
import React from 'react';
import { ContactForm } from '../../components/contactForm';

const Contact: NextPage = () => {
  return (
    <>
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

// eslint-disable-next-line import/no-default-export
export default Contact;
