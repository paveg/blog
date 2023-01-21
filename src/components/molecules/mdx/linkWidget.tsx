import { Grid, Group, Paper, Text, Col, Flex } from '@mantine/core';
import { IconLink } from '@tabler/icons';
import Link from 'next/link';
import React, { FC } from 'react';

export type LinkWidgetProps = {
  url: string;
  title: string;
  description: string;
  og?: string;
  icon?: string;
};

export const LinkWidget: FC<LinkWidgetProps> = ({
  url,
  title,
  description,
  og,
  icon
}: LinkWidgetProps) => {
  return (
    <>
      <Paper
        component={Link}
        href={url}
        mb={20}
        mt={20}
        sx={(theme) => ({
          maxWidth: '600px',
          height: '105px',
          borderRadius: theme.radius.md
          // margin: 'auto' // Centering
        })}
        withBorder
      >
        <Grid columns={24}>
          <Col pl={20} pt={16} span={15}>
            <Text fw={700} fz='sm' lineClamp={1} mb={1}>
              {title}
            </Text>
            <Text fz='xs' lineClamp={2}>
              {description}
            </Text>
            <Group noWrap>
              {icon ? (
                // eslint-disable-next-line react/jsx-no-duplicate-props
                <img height={15} loading='lazy' src={icon} width={15} />
              ) : (
                <IconLink size={15} />
              )}
              <Text fz='xs'>
                {url.indexOf('/', 8) != -1 ? url.slice(8, url.indexOf('/', 8)) : url.slice(8)}
              </Text>
            </Group>
          </Col>
          <Col span={9}>
            <Flex justify='flex-end'>
              {og && (
                <img
                  alt='og image'
                  height={105}
                  loading='lazy'
                  src={og}
                  style={{ maxInlineSize: '100%', alignItems: 'right', borderRadius: '10px' }}
                />
              )}
            </Flex>
          </Col>
        </Grid>
      </Paper>
    </>
  );
};
