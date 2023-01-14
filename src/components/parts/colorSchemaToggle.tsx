import { useMantineColorScheme, ActionIcon, Group, GroupPosition } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import React, { FC } from 'react';

type Props = {
  position?: GroupPosition;
};

export const ColorSchemaToggle: FC<Props> = ({ position }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group my='xl' position={position ? position : 'center'}>
      <ActionIcon
        aria-label='Change color scheme.'
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
