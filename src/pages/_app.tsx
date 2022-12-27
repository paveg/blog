import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Layout } from '@/components/layout';
import { siteMetadata } from '@/config/siteMetadata';

// eslint-disable-next-line import/no-default-export
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
      </Head>
      <DefaultSeo
        defaultTitle='フナイログ'
        description='PC、スマホ、ゲーミングデバイスなどガジェットモノや、便利な生活アイテム、車のコトまでをお届けするレビューブログです。'
        openGraph={{
          type: 'website',
          title: siteMetadata.title,
          site_name: siteMetadata.title,
          url: siteMetadata.url,
          images: []
        }}
        twitter={{
          handle: '@paveg_',
          site: '@site',
          cardType: 'summary_large_image'
        }}
      />

      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
          loader: 'dots'
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}
