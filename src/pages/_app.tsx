import '@/styles/globals.css';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { Noto_Sans_JP } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/errorBoundary';
import { GoogleTagManager, GoogleTagManagerId } from '@/components/google/googleTagManager';
import { Layout } from '@/components/layout';
import { siteMetadata } from '@/config/siteMetadata';
import * as gtag from '@/lib/gtag';
import * as gtm from '@/lib/gtm';

const font = Noto_Sans_JP({ subsets: ['latin'], weight: ['400', '300', '500', '700'] });

// eslint-disable-next-line import/no-default-export
export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const router = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
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
      <GoogleTagManager googleTagManagerId={gtm.GOOGLE_TAG_MANAGER_ID as GoogleTagManagerId} />
      <Script
        data-pin-hover='true'
        data-pin-tall='true'
        id='pinterest-init'
        src='//assets.pinterest.com/js/pinit.js'
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
        canonical={`${siteMetadata.url}/`}
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

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{
            /** Put your mantine theme override here */
            colorScheme: colorScheme,
            loader: 'dots',
            headings: {
              sizes: {
                h1: { fontSize: '3.0em', lineHeight: 1.3 },
                h2: { fontSize: '1.6em', lineHeight: 1.3 },
                h3: { lineHeight: 1.3 },
                h4: { lineHeight: 1.7 },
                h5: { lineHeight: 1.7 },
                h6: { lineHeight: 1.7 }
              }
            }
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ErrorBoundary>
            <main className={font.className}>
              <Layout>
                <Component {...pageProps} />
                <Analytics />
              </Layout>
            </main>
          </ErrorBoundary>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
