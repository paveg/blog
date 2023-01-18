import { IconAlertCircle } from '@tabler/icons';
import React, { FC } from 'react';
import { NoticeCard } from '@/components/atoms/mdx/noticeCard';

type Props = {
  children: React.ReactNode;
};

export const WarningNotice: FC<Props> = ({ children }: Props) => {
  return (
    <NoticeCard color='yellow' icon={<IconAlertCircle />} radius='md' variant='filled'>
      {(children as string).replace('::warning', '').replace('::', '')}
    </NoticeCard>
  );
};
