import { useMantineColorScheme, ActionIcon, Group } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import React, { FC } from 'react';

export const ColorSchemaToggle: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group my='xl' position='center'>
      <ActionIcon
        onClick={() => toggleColorScheme()}
        size='md'
        sx={(theme) => ({
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white,
          color: theme.colorScheme === 'dark' ? theme.colors.yellow[4] : theme.colors.blue[6]
        })}
      >
        {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
      </ActionIcon>
    </Group>
  );
};
