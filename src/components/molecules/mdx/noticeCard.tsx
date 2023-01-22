import { Alert, AlertProps, MantineColor } from '@mantine/core';
import { IconAlertCircle, IconCircleCheck, IconBan } from '@tabler/icons';
import React, { FC } from 'react';

type Props = {
  children: React.ReactNode | string;
  className: string;
  title?: string;
} & AlertProps;

export const NoticeCard: FC<Props> = ({ title, children, className, ...props }: Props) => {
  const noticeColor = (): MantineColor => {
    switch (className) {
      case 'success':
        return 'green.8';
      case 'warning':
        return 'yellow.6';
      case 'error':
        return 'red.5';
      default:
        return 'blue';
    }
  };

  const noticeIcon = (): React.ReactNode => {
    switch (className) {
      case 'success':
        return <IconCircleCheck />;
      case 'warning':
        return <IconAlertCircle />;
      case 'error':
        return <IconBan />;
      default:
        return <IconCircleCheck />;
    }
  };

  return (
    <Alert
      color={props.color || noticeColor()}
      icon={props.icon || noticeIcon()}
      m={props.m || 'xl'}
      radius={props.radius || 'md'}
      title={title ?? ''}
      variant={props.variant || 'filled'}
      {...props}
    >
      {children}
    </Alert>
  );
};
