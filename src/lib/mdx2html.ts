import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
// import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkUnwrapImages from 'remark-unwrap-images';

import { customRemarkPlugin, extLinkHandler, remarkLinkWidget } from '@/lib/mdx/customPlugin';

export const m2h = async (mdxSource: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(mdxSource, {
    mdxOptions: {
      remarkPlugins: [
        remarkParse,
        remarkDirective,
        remarkBreaks,
        remarkGfm,
        remarkGemoji,
        remarkLinkWidget,
        customRemarkPlugin,
        remarkUnwrapImages
      ],
      rehypePlugins: [
        rehypeSlug
        // [rehypeAutolinkHeadings, { after: 'wrap' }'
      ],
      remarkRehypeOptions: {
        handlers: {
          extlink: extLinkHandler
        }
      },
      parseFrontmatter: true
    }
  });
};
