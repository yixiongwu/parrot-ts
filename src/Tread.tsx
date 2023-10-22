import { FC, useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

import {
  upvoteAnswer,
  downvoteAnswer,
  upvoteQuestion,
  downvoteQuestion,
} from "./APIs";
import { Answer } from "./type";

interface TreadProps {
  id: number;
  title: string;
  content: string;
  upvote: number;
  downvote: number;
  answers: Answer[];
  sort: number;
  refreshFn: (sort: number) => void;
}

const answerToVoteMap = (answers: Answer[]) =>
  new Map(
    answers.map((answer) => [
      answer.id,
      answer.upvote > answer.downvote ? answer.upvote - answer.downvote : 0,
    ])
  );

const Tread: FC<TreadProps> = (prop) => {
  const [questionVote, setQuestionVote] = useState<number>(0);

  const [answerVotes, setAnswerVotes] = useState<Map<number, number>>(
    answerToVoteMap(prop.answers)
  );
  const [sortOption, setSortOption] = useState<string>(String(prop.sort));

  const handleQuestionUpvote = async (id: number) => {
    setQuestionVote(questionVote + 1);
    await upvoteQuestion(id);
    console.log(`Upvoted question with id: ${id}`);
  };

  const handleQuestionDownvote = async (id: number) => {
    setQuestionVote(questionVote - 1);
    await downvoteQuestion(id);
    console.log(`Downvoted question with id: ${id}`);
  };

  const handleAnswerUpvote = async (id: number) => {
    const answer = prop.answers.find((it) => it.id == id);
    if (answer) {
      answer.upvote++;
    }
    setAnswerVotes(answerToVoteMap(prop.answers));
    await upvoteAnswer(id);
    console.log(`Upvoted answer with id: ${id}`);
  };

  const handleAnswerDownvote = async (id: number) => {
    const answer = prop.answers.find((it) => it.id == id);
    if (answer) {
      answer.downvote++;
    }
    setAnswerVotes(answerToVoteMap(prop.answers));
    await downvoteAnswer(id);
    console.log(`Downvoted answer with id: ${id}`);
  };

  const handleSortChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    prop.refreshFn(Number(event.target.value));
    setSortOption(event.target.value);
  };

  useEffect(() => {
    setQuestionVote(
      prop.upvote > prop.downvote ? prop.upvote - prop.downvote : 0
    );
  }, [prop.upvote, prop.downvote]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{prop.title}</h1>
      <div className="flex justify-between">
        <div className="ml-4 flex flex-col items-center">
          <ArrowUpIcon
            className="h-5 w-5 mr-2"
            onClick={() => handleQuestionUpvote(prop.id)}
          />
          <span>{questionVote}</span>
          <ArrowDownIcon
            className="h-5 w-5 mr-2"
            onClick={() => handleQuestionDownvote(prop.id)}
          />
        </div>
        <p className="flex-1">{prop.content}</p>
      </div>
      <h2 className="text-xl font-bold mb-4">{prop.answers.length} Answers</h2>
      <select value={sortOption} onChange={handleSortChanged}>
        <option value="0">Default</option>
        <option value="1">Vote</option>
        <option value="2">Created Date</option>
        <option value="3">Update Date</option>
      </select>
      {prop.answers.map((answer) => (
        <div key={answer.id} className="mb-4 p-4 border rounded flex">
          <div className="ml-4 flex flex-col items-center">
            <ArrowUpIcon
              className="h-5 w-5 mr-2"
              onClick={() => handleAnswerUpvote(answer.id)}
            />
            <span>{answerVotes.get(answer.id)}</span>
            <ArrowDownIcon
              className="h-5 w-5 mr-2"
              onClick={() => handleAnswerDownvote(answer.id)}
            />
          </div>
          <div className="flex-1">{answer.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Tread;
