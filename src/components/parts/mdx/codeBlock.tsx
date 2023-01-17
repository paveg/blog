import { Prism } from '@mantine/prism';
import { MantineTheme } from '@mantine/styles';
import { Language, PrismTheme } from 'prism-react-renderer';
import lightTheme from 'prism-react-renderer/themes/github';
import darkTheme from 'prism-react-renderer/themes/okaidia';
import React, { FC } from 'react';

interface CodeBlockProps {
  language: Language;
  filename?: string;
  children: React.ReactNode;
}

export const CodeBlock: FC<CodeBlockProps> = ({ language, children, filename }: CodeBlockProps) => {
  const radius = 'md';
  const schema = (_theme: MantineTheme, colorScheme: 'light' | 'dark'): PrismTheme =>
    colorScheme === 'light' ? lightTheme : darkTheme;
  return (
    <>
      <code id='code-container'>
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
