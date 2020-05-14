const fetch = require('node-fetch')


const issueUpdate = (updateData, { count, priority },JIRA_AUTH) => {
    updateData.fields.priority.name = priority
    updateData.fields.description.content[0].content[3].text = count.toString() 
    let bodyData = {
        "fields": {
            "description":updateData.fields.description,
            "priority": {
                "name":priority,
            }
        }
    }
    
   return fetch(`https://naspersclassifieds.atlassian.net/rest/api/3/issue/${updateData.key}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${Buffer.from(
                JIRA_AUTH
            ).toString('base64')}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    })

}

module.exports = {issueUpdate}