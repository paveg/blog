// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { h } from 'hastscript';
import { visit } from 'unist-util-visit';

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
