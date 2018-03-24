const {createRobot} = require('probot')

const app = require('../index.js')

const payload = require('./events/payload.json')
const payload3 = require('./events/release.json')

describe('Digest',()=>{
  let robot
  let github
  beforeEach(()=>{
    robot = createRobot()

    app(robot)

    github = {
      issues:{
        getCommentsForRepo: jest.fn().mockReturnValue(Promise.resolve({
          data:[
            {issue_url:"https://api.github.com/repos/2pen/my-first-app/issues{/number}"},
            {issue_url:"https://api.github.com/repos/2pen/my-first-app/issues{/number}"},
            {issue_url:"https://api.github.com/repos/2pen/my-first-app/issues{/number}"}
          ]
        })),
        createComment: jest.fn()

      },
      repos:{
        getReleases: jest.fn().mockReturnValue(Promise.resolve({
          data: payload3
        }))
      }
    }
    robot.auth = () => Promise.resolve(github)
  })
 



describe('return the popular issue success',()=>{
  it('posts a comment because the new issue of"most popular issue"',async ()=>{
    await robot.receive(payload)


    expect(github.issues.getCommentsForRepo).toHaveBeenCalledWith({
      owner:'2pen',
      repo:'my-first-app',
      number:34
    })
    expect(github.issues.createComment).toHaveBeenCalled()
  })
})
})

