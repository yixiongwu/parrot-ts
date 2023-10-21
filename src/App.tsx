import { useState, useEffect } from "react";
import axios from "axios";

import Tread from './Tread';
import { Result, Question, Answer } from "./type";

const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get("id");
const getQuestionURL = `/api/question/get?id=${id}`;


const listAnswerURL = `/api/answer/list?questionId=${id}`;


const App = () => {

  const [question, setQuestion] = useState<Question>();

  useEffect(() => {
    const fetch = async () => {
      const questionRet = await axios.get<Result<Question>>(getQuestionURL);
      const questionResult = questionRet.data;
      const answerRet = await axios.get<Result<Answer[]>>(listAnswerURL);
      const answerResult = answerRet.data;
      const question = questionResult.data;
      question.answers = answerResult.data;
      // console.log(questionResult)
      setQuestion(question);
    };
    fetch();
  }, []);

  return (
    <div className="App">
      {question && <Tread title={question.title} content={question.content} answers={question.answers} />}
    </div>
  );
};

export default App;