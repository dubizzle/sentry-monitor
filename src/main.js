const {sentryRunner} = require('./sentry/sentry-issues.js')
const {jiraHandler} = require('./jira/jirahandler.js')


const jiraReporter = async function (metadata){
    try{
        for (_project of metadata.projects){
            const data = await sentryRunner(_project.project,metadata.SENTRY_AUTH)
            console.log(`For ${_project.project}, ${data.length} issues found`)
            console.log(data)
            console.log('************************************************************')
            jiraHandler(data,metadata.JIRA_AUTH)
        }
        
    } catch (err) {
        console.log('This error is originated from the jiraReporter')
        console.log (err)
    }

}

module.exports = {jiraReporter}
