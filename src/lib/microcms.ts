import { createClient } from 'microcms-js-sdk';

console.info(process.env.MICRO_CMS_SERVICE_DOMAIN);
console.info(process.env.MICRO_CMS_API_KEY);
export const cmsClient = createClient({
  serviceDomain: process.env.MICRO_CMS_SERVICE_DOMAIN || '',
  apiKey: process.env.MICRO_CMS_API_KEY || ''
});
