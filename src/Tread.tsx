import { FC, useState } from "react";
import axios from "axios";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid"; // Import the icons
import { Answer } from "./type";

interface TreadProps {
  title: string;
  content: string;
  answers: Answer[];
}

const answerToVoteMap = (answers: Answer[]) =>
  new Map(
    answers.map((answer) => [
      answer.id,
      answer.upvote > answer.downvote ? answer.upvote - answer.downvote : 0,
    ])
  );

const upvoteAnswerURL = (id: number) => `/api/answer/upvote?id=${id}`;
const downvoteAnswerURL = (id: number) => `/api/answer/downvote?id=${id}`;

const Tread: FC<TreadProps> = (question) => {
  const [answerVotes, setAnswerVotes] = useState<Map<number, number>>(
    answerToVoteMap(question.answers)
  );

  const handleUpvote = async (id: number) => {
    const answer = question.answers.find((it) => it.id == id);
    if (answer) {
      answer.upvote++;
    }
    setAnswerVotes(answerToVoteMap(question.answers));
    await axios.post(upvoteAnswerURL(id));
    console.log(`Upvoted answer with id: ${id}`);
  };

  const handleDownvote = async (id: number) => {
    const answer = question.answers.find((it) => it.id == id);
    if (answer) {
      answer.downvote++;
    }
    setAnswerVotes(answerToVoteMap(question.answers));
    await axios.post(downvoteAnswerURL(id));
    console.log(`Downvoted answer with id: ${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{question.title}</h1>
      <p className="mb-8">{question.content}</p>
      <h2 className="text-xl font-bold mb-4">
        {question.answers.length} Answers
      </h2>
      {question.answers.map((answer) => (
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
