import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

const getInitialProps = createGetInitialProps();

// eslint-disable-next-line import/no-default-export
export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang='ja'>
        <Head>
          <script src='https://embed.zenn.studio/js/listen-embed-event.js' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
