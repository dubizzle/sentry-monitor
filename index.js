
const monitor = require('./src/monitor');

const config = {
  SENTRY_AUTH: process.env.SENTRY_AUTH,
  JIRA_AUTH: process.env.JIRA_AUTH,
  NEW_RELIC_AUTH: process.env.NEW_RELIC_AUTH,
  NEW_RELIC_ACCOUNT_ID: process.env.NEW_RELIC_ACCOUNT_ID,
  org: 'dubizzle-uae',
  projects: [
    {
      project: 'monolith-paa',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'desktop-lpv',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'motors-c2c-paa-desktop-frontend',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'motors-dashboard-frontend',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'property-dashboard',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'horizontal-web',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'content-first-mweb',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
    {
      project: 'bridge-paa',
      filters: [
        {
          name: 'all',
          searchTerms: ['']
        }
      ]
    },
  ],
};

monitor(config);
