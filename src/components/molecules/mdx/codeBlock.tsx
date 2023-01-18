import { Code } from '@mantine/core';
import { Prism } from '@mantine/prism';
import lightTheme from 'prism-react-renderer/themes/github';
import darkTheme from 'prism-react-renderer/themes/okaidia';
import React, { FC } from 'react';
import type { MantineTheme } from '@mantine/styles';
import type { Language, PrismTheme } from 'prism-react-renderer';
import type { ComponentProps } from 'react';

type CodeBlockProps = {
  children?: React.ReactNode | string;
} & ComponentProps<'code'>;

export const CodeBlock: FC<CodeBlockProps> = ({ children, className }: CodeBlockProps) => {
  if (!className) return <Code className='text-primary'>{children as React.ReactNode}</Code>;

  const [languageClass, filename] = className.split(':');
  const language = (languageClass.split('-')[1] ?? 'bash') as Language;

  const radius = 'md';
  const schema = (_theme: MantineTheme, colorScheme: 'light' | 'dark'): PrismTheme =>
    colorScheme === 'light' ? lightTheme : darkTheme;
  return (
    <>
      <code>
        {filename ? (
          <Prism.Tabs defaultValue={filename}>
            <Prism.TabsList>
              <Prism.Tab
                style={{
                  pointerEvents: 'none'
                }}
                value={filename}
              >
                {filename}
              </Prism.Tab>
            </Prism.TabsList>
            <Prism.Panel
              getPrismTheme={schema}
              language={language}
              radius={radius}
              value={filename}
              withLineNumbers
            >
              {children as string}
            </Prism.Panel>
          </Prism.Tabs>
        ) : (
          <Prism getPrismTheme={schema} language={language} radius={radius} withLineNumbers>
            {children as string}
          </Prism>
        )}
      </code>
    </>
  );
};
