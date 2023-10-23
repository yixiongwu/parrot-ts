import { defineMockData } from 'vite-plugin-mock-dev-server'

const question_1_id = 1;
const question_2_id = 2;

const markdown_content = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |`

export const questions = defineMockData('questions', [
    { id: 1, title: 'How to use React with TypeScript?', content: 'I am new to TypeScript and I want to use it with React. How can I do that? Thanks', upvote: 0, downvote: 0 },
    { id: 2, title: 'Handling cancelled request with Express/Node.js and Angular', content: `When a pending HTTP request is cancelled by a client/browser it seems that Node with Express continues to process the request. For intensive requests, the CPU is still being kept busy with unnecessary requests.

    Is there a way to ask Node.js/Express to kill/stop these pending requests that are requested to be cancelled?
    
    It becomes particularly useful given that since AngularJS 1.5 HTTP request are easily cancellable by calling $cancelRequest() on $http/$resource objects.
    
    Such cancellations could occur when exposing an API method providing results for auto-completion or search fields: when typing in the field to be autocompleted or type-aheaded, previous request(s) can be cancelled.
    
    A global server.timeout does not solve the problem: 1) it is a priori a global setting for all exposed API methods 2) ongoing processing in the canceled request is not killed.`, upvote: 0, downvote: 0 },
])

export const answers = defineMockData('answers', [
    { id: 1, content: 'You can use create-react-app with the --template typescript option.', questionId: question_1_id, createDate: new Date("2023/10/1"), updateDate: new Date("2023/10/23"), upvote: 3, downvote: 0 },
    { id: 2, content: 'You can also manually setup TypeScript with React by installing the necessary dependencies.', questionId: question_1_id, createDate: new Date("2023/10/3"), updateDate: new Date("2023/10/12"), upvote: 5, downvote: 0 },
    { id: 3, content: markdown_content, questionId: question_2_id, createDate: new Date("2023/10/4"), updateDate: new Date("2023/10/13"), upvote: 0, downvote: 0 },
])  