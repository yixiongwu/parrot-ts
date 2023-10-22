import axios, { AxiosResponse } from "axios";
import { Result, Question, Answer } from "./type";

const getQuestionURL = (questionId: number) => `/api/question/get?id=${questionId}`;
const listAnswerURL = (questionId: number, sort: number) => `/api/answer/list?questionId=${questionId}&sort=${sort}`;

const upvoteAnswerURL = (answerId: number) => `/api/answer/upvote?id=${answerId}`;
const downvoteAnswerURL = (answerId: number) => `/api/answer/downvote?id=${answerId}`;

/**
  * Process the result returned by the application layer
  * @param fn Call the application service endpoint
  * @returns
  * [1,2,3]
  * 1. Result
  * 2. Error, If it is null, we can use the result.
  * 3. IsApplicationError, when we need to handle system error and application error separately.
  */
async function HandleResult<T>(fn: () => Promise<AxiosResponse<Result<T>, unknown>>): Promise<[T | null, string | null, boolean]> {
    try {
        const ret = await fn();
        const result = ret.data;
        if (result.success)
            return [result.data, null, true];
        else
            return [null, result.error, true];
    } catch (error) {
        const message = (error instanceof Error) ? error.message : `unknown:${error}`;
        return [null, message, false];
    }
}

export const getQuestion = async (id: number) => {
    return await HandleResult<Question>(() => axios.get<Result<Question>>(getQuestionURL(id)));
};

export const getAnswers = async (questionId: number, sort: number) => {
    return await HandleResult<Answer[]>(() => axios.get<Result<Answer[]>>(listAnswerURL(questionId, sort)));
};

export const upvoteAnswer = async (id: number) => {
    return await HandleResult<boolean>(() => axios.post<Result<boolean>>(upvoteAnswerURL(id)));
};

export const downvoteAnswer = async (id: number) => {
    return await HandleResult<boolean>(() => axios.post(downvoteAnswerURL(id)));
};
