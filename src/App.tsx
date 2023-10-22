import { useState, useEffect, useRef } from "react";

import Thread from "./Thread";
import { getAnswers, getQuestion } from "./APIs";
import { Answer, Question } from "./type";

const searchParams = new URLSearchParams(window.location.search);
const id = Number(searchParams.get("id"));
const AnswerSortSessionKey = "AnswerSortSessionKey";

const App = () => {
  const sort = Number(sessionStorage.getItem(AnswerSortSessionKey)) ?? 0;
  const [question, setQuestion] = useState<Question | null>();
  const [answers, setAnswers] = useState<Answer[] | null>();

  const refreshQuestion = async (id: number, sort: number) => {
    console.log(`refreshQuestion ${sort}`);
    const [question] = await getQuestion(id);
    const [answers] = await getAnswers(id, sort);
    if (question) {
      setQuestion(question);
    }
    if (answers) {
      setAnswers(answers);
    }
  };

  const refreshAnswers = async (id: number, sort: number) => {
    console.log(`refreshAnswers ${sort}`);
    const [answers] = await getAnswers(id, sort);
    if (answers) {
      setAnswers(answers);
    }
    sessionStorage.setItem(AnswerSortSessionKey, String(sort));
  };

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    console.log(`useEffect ${sort}`);
    refreshQuestion(id, sort);
  }, [sort]);

  return (
    <div className="App">
      {question && (
        <Thread
          id={question.id}
          title={question.title}
          content={question.content}
          answers={answers || []}
          upvote={question.upvote}
          downvote={question.downvote}
          sort={sort}
          refreshFn={(sort: number) => refreshAnswers(id, sort)}
        />
      )}
    </div>
  );
};

export default App;
