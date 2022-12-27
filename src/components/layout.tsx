import { Container } from '@mantine/core';
import React, { FC, ReactNode } from 'react';
import { Footer } from './footer';
import { Header } from './header';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const headerLinks = [
    {
      link: '/',
      label: 'ホーム'
    },
    {
      link: '/about-funailog',
      label: 'フナイログについて'
    }
  ];
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
      <Header links={headerLinks} />
      <main>
        <Container>{children}</Container>
      </main>
      <Footer links={footerLinks} />
    </>
  );
};
