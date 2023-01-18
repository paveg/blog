import { IconCircleCheck } from '@tabler/icons';
import React, { FC } from 'react';
import { NoticeCard } from '@/components/atoms/mdx/noticeCard';

type Props = {
  children: React.ReactNode;
};

export const SuccessNotice: FC<Props> = ({ children }: Props) => {
  return (
    <NoticeCard color='green' icon={<IconCircleCheck />} radius='md' variant='filled'>
      {(children as string).replace('::success', '').replace('::', '')}
    </NoticeCard>
  );
};
