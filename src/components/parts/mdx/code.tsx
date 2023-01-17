import { Code as MantineCode, CodeProps } from '@mantine/core';
import { Language } from 'prism-react-renderer';
import React from 'react';
import { CodeBlock } from './codeBlock';

export const Code = ({ children, className, ...props }: CodeProps) => {
  if (!className) return <MantineCode className='text-primary'>{children}</MantineCode>;

  const [language, filename] = className.split(':');
  return (
    <CodeBlock filename={filename} language={language.split('-')[1] as Language} {...props}>
      {children}
    </CodeBlock>
  );
};
