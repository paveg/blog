import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeToc from 'rehype-toc';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkGemoji from 'remark-gemoji';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkUnwrapImages from 'remark-unwrap-images';

import { customRemarkPlugin, extLinkHandler, remarkLinkWidget } from '@/lib/mdx/customPlugin';

const tocSettings = {
  headings: 'h2 h3'.split(' ')
};

export const m2h = async (mdxSource: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(mdxSource, {
    parseFrontmatter: true,
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
        rehypeSlug,
        [rehypeToc, tocSettings],
        [rehypeAutolinkHeadings, { behavior: 'prepend' }]
      ],
      remarkRehypeOptions: {
        handlers: {
          extlink: extLinkHandler
        }
      }
    }
  });
};
