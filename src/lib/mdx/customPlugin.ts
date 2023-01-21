// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { h } from 'hastscript';
import getMetadata from 'metadata-scraper';
import { visit } from 'unist-util-visit';
import { isLink, isParagraph, isParent } from '@/lib/mdast/utils';
import type { Paragraph, Link, Literal } from 'mdast';
import type { H } from 'mdast-util-to-hast';
import type { Plugin, Transformer } from 'unified';
import type { Node, Parent } from 'unist';
import type { VFileCompatible } from 'vfile';

interface ExtLink extends Literal {
  type: 'extlink';
  meta: {
    url: string;
    title: string;
    description: string;
    og: string;
    icon: string;
  };
}

export function customRemarkPlugin() {
  // TODO: implement some embeds
  // e.g. GitHub, Twitter, GoogleMap and something similar websites.
  return (tree, file) => {
    visit(tree, (node) => {
      if (
        node.type === 'textDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'containerDirective'
      ) {
        if (node.name !== 'youtube') {
          const data = node.data || (node.data = {});
          const hast = h(node.name, node.attributes);

          data.hName = hast.tagName;
          data.hProperties = hast.properties;
        } else if (node.name === 'googlemap') {
          const data = node.data || (node.data = {});
          const attributes = node.attributes || {};
          const src = attributes.src;

          if (!src) file.fail('Missing video id', node);

          data.hName = 'googlemap';
          data.hProperties = {
            src: src
          };
        } else {
          const data = node.data || (node.data = {});
          const attributes = node.attributes || {};
          const id = attributes.id;

          if (node.type === 'textDirective')
            file.fail('Text directives for `youtube` not supported', node);
          if (!id) file.fail('Missing video id', node);
          data.hName = 'youtube';
          data.hProperties = {
            src: 'https://www.youtube.com/embed/' + id,
            id: id
          };
        }
      }
    });
  };
}

function isExtLink(node: unknown): node is Paragraph {
  if (!isParagraph(node)) {
    return false;
  }

  const { children } = node;

  if (children.length !== 1) {
    return false;
  }

  const singleChild = children[0];
  if (
    !(
      isLink(singleChild) &&
      singleChild.children[0].type === 'text' &&
      singleChild.url.startsWith('http')
    )
  ) {
    return false;
  }

  return true;
}

function fetchMeta(url: string) {
  const metas = getMetadata(url).then((data) => {
    const metaData = {
      url: url,
      title: data.title ?? '',
      description: data.description ?? '',
      og: data.image ?? '',
      icon: data.icon ?? ''
    };
    return metaData;
  });
  return metas;
}

export const remarkLinkWidget: Plugin = function extLinkTrans(): Transformer {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return async (tree: Node, _file: VFileCompatible) => {
    const promises: (() => Promise<void>)[] = [];
    visit(tree, isExtLink, visitor);
    await Promise.all(promises.map((t) => t()));

    function visitor(node: Paragraph, index: number, parent: Parent | undefined) {
      if (!isParent(parent)) {
        return;
      }

      if (parent.type === 'listItem') {
        return;
      }

      const child = node.children[0] as Link;

      promises.push(async () => {
        const data = await fetchMeta(child.url);
        parent.children[index] = {
          type: 'extlink',
          meta: data
        } as ExtLink;
      });
    }
  };
};

export function extLinkHandler(_h: H, node: ExtLink) {
  return {
    type: 'element' as const,
    tagName: 'extlink',
    properties: {
      url: node.meta.url,
      title: node.meta.title,
      description: node.meta.description,
      og: node.meta.og,
      icon: node.meta.icon
    },
    children: []
  };
}
