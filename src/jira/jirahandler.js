const {jiraIssueCheck} = require('./search')
const {createIssue} = require('./create')
const {getIssue} = require('./getissue')
const {issueUpdate} = require('./update')
function dataformatter ({id,title,permalink,userCount,project,metadata}){
    let jiraData = {}
    const labelRegex = /\s/gi
    const regex = /("|\\")/gi
    jiraData.sentryId=id 
    jiraData.title = title.replace(regex,'\\"')
    jiraData.count = userCount
    jiraData.project = project.name.replace(labelRegex,'-')
    jiraData.log = JSON.stringify(metadata)
    jiraData.link = permalink

    if(jiraData.count<=200){
        jiraData.priority="Average"
    }
    else if (jiraData.count<=500){
        jiraData.priority="High"
    }
    else if (jiraData.count<=1000){
        jiraData.priority="Highest"
    }
    else {
        jiraData.priority="Critical"
    }
    return jiraData
}

const jiraHandler = async (sentryData,JIRA_AUTH,sentryProject) => {
    try{
        for (element of sentryData){
            let jiraData = dataformatter(element)
            let issuesFound = await jiraIssueCheck(jiraData,JIRA_AUTH)
            if(issuesFound.length==1){
                let response = await getIssue(issuesFound[0].key,JIRA_AUTH) 
                let updateData = await response.json()
                let updateResponse = await issueUpdate(updateData,jiraData,JIRA_AUTH)
                if(updateResponse.status!=204)
                {
                    throw new Error(`Error updating an issue:${response}`)
                }
            } 
            else if(issuesFound.length == 0) {
                let response = await createIssue(jiraData,JIRA_AUTH)
                if(response.status!=201)
                {
                    throw new Error(`Error creating an issue:${response}`)
                }
                
            }
            else{
                console.log(`For ID:${jiraData.sentryId} there are multiple results, this is not correct please check jira.`)
            }
        }
    } catch (err) {
        console.log(err)
    } finally {
        console.log(`For Sentry project:${sentryProject}, jira stage done`)
    }
    
}


module.exports = {jiraHandler} 