import React, { FC } from 'react';
import { Boundary } from '@/lib/bugsnag';
import { ServerError } from 'pages/500';

type Props = {
  children: React.ReactNode;
};

export const ErrorBoundary: FC<Props> = ({ children }: Props) => {
  return <Boundary FallbackComponent={ServerError}>{children}</Boundary>;
};
