import { defineMockData } from 'vite-plugin-mock-dev-server'

const question_1_id = 1;
const question_2_id = 2;

export const questions = defineMockData('questions', [
    { id: 1, title: 'How to use React with TypeScript?', content: 'I am new to TypeScript and I want to use it with React. How can I do that? Thanks', upvote: 0, downvote: 0 },
    { id: 2, title: 'title2', content: 'content2', upvote: 0, downvote: 0 },
])

export const answers = defineMockData('answers', [
    { id: 1, content: 'You can use create-react-app with the --template typescript option.', questionId: question_1_id, createDate: new Date("2023/10/1"), updateDate: new Date("2023/10/23"), upvote: 3, downvote: 0 },
    { id: 2, content: 'You can also manually setup TypeScript with React by installing the necessary dependencies.', questionId: question_1_id, createDate: new Date("2023/10/3"), updateDate: new Date("2023/10/12"), upvote: 5, downvote: 0 },
    { id: 3, content: 'content3', questionId: question_2_id, createDate: new Date("2023/10/4"), updateDate: new Date("2023/10/13"), upvote: 0, downvote: 0 },
])