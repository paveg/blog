import { Accordion, Box, Text } from '@mantine/core';
import { IconNote } from '@tabler/icons';
import React, { FC, useState } from 'react';

type Props = {
  summary?: string;
  children?: React.ReactNode;
};

export const DetailArea: FC<Props> = ({ summary, children }: Props) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Accordion
      defaultValue={value}
      onChange={() => (value === null ? setValue(summary) : setValue(null))}
      radius='md'
      value={value}
      variant='contained'
    >
      <Accordion.Item value={summary}>
        <Accordion.Control icon={<IconNote />}>
          <Text fw={600} fz='md'>
            {summary}
          </Text>
        </Accordion.Control>
        <Accordion.Panel>
          <Box ml={5} mr={5}>
            <Text fz='sm'>{children}</Text>
          </Box>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
