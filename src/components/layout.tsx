import { Container } from '@mantine/core';
import React, { FC, ReactNode } from 'react';
import { Footer } from './footer';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const footerLinks = [
    {
      link: '/',
      label: 'ホーム'
    },
    {
      link: '/privacy-policy',
      label: 'プライバシーポリシー'
    }
  ];
  return (
    <>
      {/* Header */}
      <main>
        <Container>{children}</Container>
      </main>
      <Footer links={footerLinks} />
    </>
  );
};
