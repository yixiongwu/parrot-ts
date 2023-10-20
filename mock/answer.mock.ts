import { defineMock } from 'vite-plugin-mock-dev-server'
import { answers } from './data'
import { CreateResult } from './type'

const data = answers.value

export default defineMock([
  {
    url: '/api/answer/list',
    response: (req, res) => {
      const questionId = req.query.questionId;
      const sort = req.query.sort;
      const list = data.filter(it => it.questionId == questionId) ?? null
      if (sort == 1) {
        list.sort((a, b) => a.createDate - b.createDate);
      } else if (sort == 2) {
        list.sort((a, b) => a.updateDate - b.updateDate);
      } else if (sort == 3) {
        list.sort((a, b) => (b.upvote - b.downvote) - (a.upvote - a.downvote));
      }
      res.end(JSON.stringify(list));
    }
  },
  {
    url: '/api/answer/upvote',
    method: 'POST',
    response: (req, res) => {
      const id = req.query.id
      const answer = data.find(it => it.id == id) ?? null
      if (answer) {
        answer.upvote++;
        res.end(JSON.stringify(CreateResult(true)));
      }
      else {
        res.end(JSON.stringify(CreateResult(false)));
      }
    }
  },
  {
    url: '/api/answer/downvote',
    method: 'POST',
    response: (req, res) => {
      const id = req.query.id
      const answer = data.find(it => it.id == id) ?? null
      if (answer) {
        answer.downvote++;
        res.end(JSON.stringify(CreateResult(true)));
      }
      else {
        res.end(JSON.stringify(CreateResult(false)));
      }
    }
  },
])