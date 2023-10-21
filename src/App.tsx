import { useState, useEffect } from "react";

import Tread from "./Tread";
import { getQuestion } from "./Apis";
import { Question } from "./type";

const searchParams = new URLSearchParams(window.location.search);
const id = Number(searchParams.get("id"));

const App = () => {
  const [question, setQuestion] = useState<Question>();

  const refreshQuestion = async (id: number, sort: number) => {
    const question = await getQuestion(id, sort);
    setQuestion(question);
  };

  useEffect(() => {
    refreshQuestion(id, 0);
  }, []);

  return (
    <div className="App">
      {question && (
        <Tread
          title={question.title}
          content={question.content}
          answers={question.answers}
          refreshFn={(sort: number) => refreshQuestion(id, sort)}
        />
      )}
    </div>
  );
};

export default App;
