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
        return 'green';
      case 'warning':
        return 'yellow';
      case 'error':
        return 'red';
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
      color={noticeColor() || props.color}
      icon={noticeIcon()}
      m='sm'
      radius='md'
      title={title ?? ''}
      variant='filled'
      {...props}
    >
      {children}
    </Alert>
  );
};
