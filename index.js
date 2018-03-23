const lib = require('./lib')
const createScheduler = require('probot-scheduler')
let setarray = lib.setArr
let response = lib.response
let GetDateStr = lib.GetDateStr
let TsfTime = lib.TsfTime
let ConTime = lib.ConTime

module.exports = (robot) => {
  robot.on(['issues.opened', 'issue_comment'], async context => {
    const result = await context.github.issues.getCommentsForRepo(context.issue())
    let mostly = []
    let k = 0
    result.data.forEach(value => {
      mostly[k] = value.issue_url
      k++
    })

    let PopularIssue = setarray(mostly).key
    let array = PopularIssue.split('/')
    array.splice(2, 2)
    array.splice(2, 0, 'github.com')
    let issue_url = array.join('/')
    // robot.log(issue_url)                                  "test"

    const all_release = await context.github.repos.getReleases(context.repo())
    let TimeValue = []
    let Tag = []
    let index = {}
    let i = 0
    all_release.data.forEach(value => {
      TimeValue[i] = value.published_at
      Tag[i] = value.tag_name
      index[value.published_at] = value.tag_name
      i++
    })
    let j = 0
    let dataindex = []
    let now = GetDateStr(-7)
    TimeValue.forEach(element => {
      if (ConTime(TsfTime(element), TsfTime(now))) { dataindex.push(element) }
    })
    let tags = []
    dataindex.forEach(element => {
      tags.push(index[element])
    })

    let tagstring = tags.toString()
    if (!tagstring) { tagstring = 'None!' }
    // robot.log(tags)                                          "test"

    // robot.log(dataindex)                                     "test"

    const title = context.payload.issue.title
    let comment_body = null
    if (context.payload.comment) { comment_body = context.payload.comment.body }

    robot.log(title)
    if (!comment_body) {
      response(title, context, issue_url, tagstring)
    } else {
      response(comment_body, context, issue_url, tagstring)
    }
  })
}
