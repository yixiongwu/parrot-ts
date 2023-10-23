import { useState, useEffect, useRef } from "react";
import { useLocation  } from 'react-router-dom';

import QuestionComponent from "./Components/Question";
import AnswerComponent from "./Components/Answer";

import { getAnswers, getQuestion } from "./APIs";
import { Question, Answer } from "./type";

const AnswerSortSessionKey = "AnswerSortSessionKey";

const Thread = () => {
  // get id from browser url query string
  const location = useLocation();
  const id = Number(new URLSearchParams(location.search).get('id'));

  // get answer sort key from browser session storage
  const sort = Number(sessionStorage.getItem(AnswerSortSessionKey)) ?? 0;

  const [question, setQuestion] = useState<Question | null>();
  const [answers, setAnswers] = useState<Answer[] | null>();
  const [sortOption, setSortOption] = useState<string>(String(sort));

  const refreshQuestion = async (id: number, sort: number) => {
    console.log(`refreshQuestion id = ${id} sort = ${sort}`);
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
    console.log(`refreshAnswers id = ${id} sort = ${sort}`);
    const [answers] = await getAnswers(id, sort);
    if (answers) {
      setAnswers(answers);
    }
    sessionStorage.setItem(AnswerSortSessionKey, String(sort));
  };

  const handleSortChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    refreshAnswers(id, Number(event.target.value));
    setSortOption(event.target.value);
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
    <div>
      {question && (
        <QuestionComponent
          id={question.id}
          title={question.title}
          content={question.content}
          upvote={question.upvote}
          downvote={question.downvote}
        />
      )}
      <select value={sortOption} onChange={handleSortChanged}>
        <option value="0">Default</option>
        <option value="1">Vote</option>
        <option value="2">Created Date</option>
        <option value="3">Update Date</option>
      </select>
      {answers &&
        answers.map((answer) => (
          <AnswerComponent
            key={answer.id}
            id={answer.id}
            content={answer.content}
            upvote={answer.upvote}
            downvote={answer.downvote}
          />
        ))}
    </div>
  );
};

export default Thread;
