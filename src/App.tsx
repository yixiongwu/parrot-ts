import { useState, useEffect } from "react";

import axios from "axios";
import moment from 'moment'

import { Result, Question, Answer } from "./type";

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");
const getQuestionURL = `/api/question/get?id=${id}`;
// const upvoteQuestionURL = `/api/question/upvote?id=${id}`
// const downvoteQuestionURL = `/api/question/downvote?id=${id}`

const listAnswerURL = `/api/answer/list?questionId=${id}`;
// const upvoteAnswerURL = `/api/answer/upvote?questionId=${id}`
// const downvoteAnswerURL = `/api/answer/downvote?questionId=${id}`

export default function App() {
  const [question, setQuestion] = useState<Question>();
  const [answers, setAnswers] = useState<Answer[]>();

  useEffect(() => {
    const fetch = async () => {
      const questionRet = await axios.get<Result<Question>>(getQuestionURL);
      const questionResult = questionRet.data;
      // console.log(questionResult)
      setQuestion(questionResult.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const answerRet = await axios.get<Result<Answer[]>>(listAnswerURL);
      const answerResult = answerRet.data;
      // console.log(answerResult)
      setAnswers(answerResult.data);
    };
    fetch();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        {question?.title}
        {question?.content}
      </h1>
      <ul>
        {answers?.map((answer) => (
          <li key={answer.id}>
            {answer?.content}
            <br />
            {answer?.upvote}
            <br />
            {answer?.downvote}
            <br />
            {moment(answer?.createDate).format('YYYY-MM-DD')}
            <br />
            {moment(answer?.updateDate).format('YYYY-MM-DD')}
          </li>
        ))}
      </ul>
    </div>
  );
}
