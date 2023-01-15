import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n')
  }
});

export const fetchPopularPosts = async (
  startDate: '7daysAgo' | '14daysAgo' | '30daysAgo',
  pageSize: number
) => {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: startDate,
        endDate: 'today'
      }
    ],
    dimensions: [
      {
        name: 'pagePath'
      }
    ],
    metrics: [
      {
        name: 'screenPageViews'
      }
    ],
    dimensionFilter: {
      filter: {
        fieldName: 'pagePath',
        stringFilter: {
          matchType: 5,
          value: '^/(articles)/[0-9a-zA-Z\\-]+$'
        }
      }
    },
    limit: pageSize
  });
  return response.rows?.map((row) => ({
    path:
      row.dimensionValues !== null && row.dimensionValues !== undefined
        ? row.dimensionValues[0].value
        : null,
    readCount:
      row.metricValues !== null && row.metricValues !== undefined
        ? Number(row.metricValues[0]?.value)
        : 0
  }));
};
