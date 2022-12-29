import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import nookies from 'nookies';
import React from 'react';
import * as gtag from '@/lib/gtag';

type WithNonceProps = {
  preview: boolean;
};

// eslint-disable-next-line import/no-default-export
export default class _Document extends Document<WithNonceProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const cookies = nookies.get(ctx);
    const preview = cookies.__next_preview_data || false;

    return {
      ...initialProps,
      preview
    };
  }

  render() {
    const preview = this.props.preview;
    console.info('preview: ', preview);

    return (
      <Html lang='ja'>
        <Head>
          <script async src='https://embed.zenn.studio/js/listen-embed-event.js' />
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
              ${preview ? "window['ga-disable-" + gtag.GA_TRACKING_ID + "'] = true;" : ''}
              `
            }}
            id='gtagi-init'
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
