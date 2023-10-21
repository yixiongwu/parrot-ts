import { FC, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

import { upvoteAnswer, downvoteAnswer } from "./APIs";
import { Answer } from "./type";

interface TreadProps {
  title: string;
  content: string;
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
  const [answerVotes, setAnswerVotes] = useState<Map<number, number>>(
    answerToVoteMap(prop.answers)
  );
  const [sortOption, setSortOption] = useState<string>(String(prop.sort));

  const handleUpvote = async (id: number) => {
    const answer = prop.answers.find((it) => it.id == id);
    if (answer) {
      answer.upvote++;
    }
    setAnswerVotes(answerToVoteMap(prop.answers));
    await upvoteAnswer(id);
    console.log(`Upvoted answer with id: ${id}`);
  };

  const handleDownvote = async (id: number) => {
    const answer = prop.answers.find((it) => it.id == id);
    if (answer) {
      answer.downvote++;
    }
    setAnswerVotes(answerToVoteMap(prop.answers));
    await downvoteAnswer(id);
    console.log(`Downvoted answer with id: ${id}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    prop.refreshFn(Number(event.target.value));
    setSortOption(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{prop.title}</h1>
      <p className="mb-8">{prop.content}</p>
      <h2 className="text-xl font-bold mb-4">{prop.answers.length} Answers</h2>
      <select value={sortOption} onChange={handleSortChange}>
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
              onClick={() => handleUpvote(answer.id)}
            />
            <span>{answerVotes.get(answer.id)}</span>
            <ArrowDownIcon
              className="h-5 w-5 mr-2"
              onClick={() => handleDownvote(answer.id)}
            />
          </div>
          <div className="flex-1">{answer.content}</div>
        </div>
      ))}
    </div>
  );
};

export default Tread;
