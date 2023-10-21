import { useState, useEffect } from "react";

import Tread from "./Tread";
import { getQuestion } from "./APIs";
import { Question } from "./type";

const searchParams = new URLSearchParams(window.location.search);
const id = Number(searchParams.get("id"));
const AnswerSortSessionKey = "AnswerSortSessionKey";

const App = () => {
  const sort = Number(sessionStorage.getItem(AnswerSortSessionKey)) ?? 0;
  const [question, setQuestion] = useState<Question>();

  const refreshQuestion = async (id: number, sort: number) => {
    const question = await getQuestion(id, sort);
    setQuestion(question);
    sessionStorage.setItem(AnswerSortSessionKey, String(sort));
  };

  useEffect(() => {
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
          refreshFn={(sort: number) => refreshQuestion(id, sort)}
        />
      )}
    </div>
  );
};

export default App;
