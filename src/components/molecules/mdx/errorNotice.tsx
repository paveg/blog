import { IconBan } from '@tabler/icons';
import React, { FC } from 'react';
import { NoticeCard } from '@/components/atoms/mdx/noticeCard';

type Props = {
  children: React.ReactNode;
};

export const ErrorNotice: FC<Props> = ({ children }: Props) => {
  return (
    <NoticeCard color='red' icon={<IconBan />} radius='md' variant='filled'>
      {(children as string).replace('::error', '').replace('::', '')}
    </NoticeCard>
  );
};
