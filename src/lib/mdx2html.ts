import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

export const m2h = async (mdxSource: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(mdxSource, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: []
    }
  });
};
