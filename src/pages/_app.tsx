import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Layout } from '@/components/layout';
import { siteMetadata } from '@/config/siteMetadata';
import { usePageView } from '@/hooks/usePageView';
import { GA_ID } from '@/lib/gtag';

// eslint-disable-next-line import/no-default-export
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  usePageView();

  return (
    <>
      <Head>
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                   window.dataLayer = window.dataLayer || [];
                   function gtag(){dataLayer.push(arguments);}
                   gtag('js', new Date());
                   gtag('config', '${GA_ID}', {
                     page_path: window.location.pathname,
                   });`
              }}
              id='gtag-init'
            />
          </>
        )}
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
