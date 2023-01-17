import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';

export const mdx2html = async (mdSource: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(mdSource, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: []
    }
  });
};
