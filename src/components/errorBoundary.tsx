import Bugsnag from '@bugsnag/js';
import React, { FC } from 'react';
import { ErrorBoundary as Boundary } from 'react-error-boundary';
import Custom500 from 'pages/500';

type Props = {
  children: React.ReactNode;
};

const errorHandler = (error: Error) => {
  Bugsnag.notify(error);
};

// Note: Component for testing
// const BadComponent: FC = () => {
//   throw new Error('test error');
//   return <></>;
// };

export const ErrorBoundary: FC<Props> = ({ children }: Prop) => {
  return (
    <Boundary FallbackComponent={<Custom500 />} onError={errorHandler}>
      {children}
    </Boundary>
  );
};
