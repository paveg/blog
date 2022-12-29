import { NextApiResponse } from 'next';

// eslint-disable-next-line import/no-default-export
export default (res: NextApiResponse) => {
  res.clearPreviewData();
};
