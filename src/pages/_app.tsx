import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Layout } from '../components/layout';

// eslint-disable-next-line import/no-default-export
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>フナイログ</title>
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
      </Head>

      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light'
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
