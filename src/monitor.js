const { getSentryDataByProject, processSentryDataForProject } = require('./sentry.js');
const { jiraReporter } = require('./main')
const opts = {};

const getConstants = ({ SENTRY_AUTH, JIRA_AUTH, org, projects }) => {
  return {
    JIRA_AUTH,
    SENTRY_AUTH,
    org,
    projects,
  };
};

const run = (config, debug=false) => {
  opts.constants = getConstants(config);
  const endTime = new Date().getTime();
  const startTime = endTime - opts.constants.INTERVAL;
  console.info(`--------------------------------------------------------`);
  console.info(`Beginning task for range: ${new Date(startTime)} - ${new Date(endTime)}`);
  jiraReporter(opts.constants)
};

module.exports = run;