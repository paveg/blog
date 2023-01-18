import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkBreaks from 'remark-breaks';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { customRemarkPlugin } from './mdx/customPlugin';

export const m2h = async (mdxSource: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(mdxSource, {
    mdxOptions: {
      remarkPlugins: [remarkParse, remarkDirective, customRemarkPlugin, remarkBreaks, remarkGfm],
      rehypePlugins: [],
      format: 'mdx'
    }
  });
};
