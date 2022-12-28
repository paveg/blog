import '@/styles/globals.css';
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect } from 'react';
import { Layout } from '@/components/layout';
import { siteMetadata } from '@/config/siteMetadata';
import * as gtag from '@/lib/gtag';

// eslint-disable-next-line import/no-default-export
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    import('zenn-embed-elements');
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    router.events.on('hashChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('hashChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        data-pin-hover='true'
        data-pin-tall='true'
        id='pinterest-init'
        src='//assets.pinterest.com/js/pinit.js'
        strategy='lazyOnload'
      />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        strategy='afterInteractive'
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
        }}
        id='gtag-init'
        strategy='afterInteractive'
      />
      <Head>
        <meta content='minimum-scale=1, initial-scale=1, width=device-width' name='viewport' />
      </Head>
      <DefaultSeo
        defaultTitle={siteMetadata.title}
        description={siteMetadata.description}
        openGraph={{
          type: 'website',
          title: siteMetadata.title,
          site_name: siteMetadata.title,
          url: siteMetadata.url,
          images: [
            { url: siteMetadata.openGraph.defaultUrl, width: 1200, height: 630, type: 'image/png' }
          ]
        }}
        twitter={{
          handle: siteMetadata.social.twitter.handle,
          site: siteMetadata.social.twitter.site,
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
          <Analytics />
        </Layout>
      </MantineProvider>
    </>
  );
}
