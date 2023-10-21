import axios from "axios";
import { Result, Question, Answer } from "./type";

const getQuestionURL = (questionId: number) => `/api/question/get?id=${questionId}`;
const listAnswerURL = (questionId: number, sort: number) => `/api/answer/list?questionId=${questionId}&sort=${sort}`;

const upvoteAnswerURL = (answerId: number) => `/api/answer/upvote?id=${answerId}`;
const downvoteAnswerURL = (answerId: number) => `/api/answer/downvote?id=${answerId}`;

export const getQuestion = async (id: number, sort: number) => {
    const questionRet = await axios.get<Result<Question>>(getQuestionURL(id));
    const questionResult = questionRet.data;
    const answerRet = await axios.get<Result<Answer[]>>(listAnswerURL(id, sort));
    const answerResult = answerRet.data;
    const question = questionResult.data;
    question.answers = answerResult.data;
    return question;
};

export const upvoteAnswer = async (id: number) => await axios.post(upvoteAnswerURL(id));

export const downvoteAnswer = async (id: number) => await axios.post(downvoteAnswerURL(id));

