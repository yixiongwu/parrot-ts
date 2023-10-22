import { useState, useEffect, useRef } from "react";

import Tread from "./Tread";
import { getAnswers, getQuestion } from "./APIs";
import { Question } from "./type";

const searchParams = new URLSearchParams(window.location.search);
const id = Number(searchParams.get("id"));
const AnswerSortSessionKey = "AnswerSortSessionKey";

const App = () => {
  const sort = Number(sessionStorage.getItem(AnswerSortSessionKey)) ?? 0;
  const [question, setQuestion] = useState<Question | null>();

  const refreshQuestion = async (id: number, sort: number) => {
    console.log(`refreshQuestion ${sort}`)
    const [question] = await getQuestion(id);
    const [answers] = await getAnswers(id, sort);
    if (question) {
      question.answers = answers || [];
      setQuestion(question);
    }
  };

  const refreshAnswers = async (id: number, sort: number) => {
    console.log(`refreshAnswers ${sort}`)
    const [answers] = await getAnswers(id, sort);
    if (question) {
      question.answers = answers || [];
      setQuestion(question);
    }
    sessionStorage.setItem(AnswerSortSessionKey, String(sort));
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }    
    console.log(`useEffect ${sort}`)
    refreshQuestion(id, sort);
  }, [sort]);

  return (
    <div className="App">
      {question && (
        <Tread
          title={question.title}
          content={question.content}
          answers={question.answers}
          sort={sort}
          refreshFn={(sort: number) => refreshAnswers(id, sort)}
        />
      )}
    </div>
  );
};

export default App;
