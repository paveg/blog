import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';

export const m2h = async (mdSource: string): Promise<MDXRemoteSerializeResult> => {
  return await serialize(mdSource, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMdxCodeMeta],
      rehypePlugins: []
    }
  });
};
