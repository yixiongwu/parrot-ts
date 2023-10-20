import { defineMock } from 'vite-plugin-mock-dev-server'
import { questions } from './data'
import { CreateResult } from './type'

const data = questions.value

export default defineMock([
  {
    url: '/api/question/get',
    response: (req, res) => {
      const questionId = req.query.id
      const question = data.find(it => it.id == questionId) ?? null
      res.end(JSON.stringify(CreateResult(question)));
    }
  },
  {
    url: '/api/question/upvote',
    method: 'POST',
    response: (req, res) => {
      const questionId = req.query.id
      const question = data.find(it => it.id == questionId) ?? null
      if (question) {
        question.upvote++;
        res.end(JSON.stringify(CreateResult(true)));
      }
      else {
        res.end(JSON.stringify(CreateResult(false)));
      }
    }
  },
  {
    url: '/api/question/downvote',
    method: 'POST',
    response: (req, res) => {
      const questionId = req.query.id
      const question = data.find(it => it.id == questionId) ?? null
      if (question) {
        question.downvote++;
        res.end(JSON.stringify(CreateResult(true)));
      }
      else {
        res.end(JSON.stringify(CreateResult(false)));
      }
    }
  },
])