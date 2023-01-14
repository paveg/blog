import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact, { BugsnagPluginReactResult } from '@bugsnag/plugin-react';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import React from 'react';

Bugsnag.start({
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_API_KEY ?? '',
  appVersion: publicRuntimeConfig.version,
  releaseStage: process.env.NEXT_PUBLIC_VERCEL_ENV ?? 'local',
  plugins: [new BugsnagPluginReact()]
});

const plugin = Bugsnag.getPlugin('react') as BugsnagPluginReactResult;
export const Boundary = plugin.createErrorBoundary(React);
