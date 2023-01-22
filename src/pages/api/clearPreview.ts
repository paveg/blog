import { NextApiResponse } from 'next';


export default (res: NextApiResponse) => {
  res.clearPreviewData();
};
