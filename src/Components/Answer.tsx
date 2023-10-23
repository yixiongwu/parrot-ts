import { FC, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { upvoteAnswer, downvoteAnswer } from "../APIs";

interface AnswerProps {
  id: number;
  content: string;
  upvote: number;
  downvote: number;
}

const Answer: FC<AnswerProps> = (props) => {
  const [answerVote, setAnswerVote] = useState<number>(
    props.upvote > props.downvote ? props.upvote - props.downvote : 0
  );

  const handleAnswerUpvote = async (id: number) => {
    setAnswerVote(answerVote + 1);
    await upvoteAnswer(id);
    console.log(`Upvoted answer with id: ${id}`);
  };

  const handleAnswerDownvote = async (id: number) => {
    setAnswerVote(answerVote - 1);
    await downvoteAnswer(id);
    console.log(`Downvoted answer with id: ${id}`);
  };

  return (
    <div className="mb-4 p-4 border rounded flex">
      <div className="ml-4 flex flex-col items-center">
        <ArrowUpIcon
          className="h-5 w-5 mr-2"
          onClick={() => handleAnswerUpvote(props.id)}
        />
        <span>{answerVote}</span>
        <ArrowDownIcon
          className="h-5 w-5 mr-2"
          onClick={() => handleAnswerDownvote(props.id)}
        />
      </div>
      <div className="flex-1">
        <Markdown remarkPlugins={[remarkGfm]}>{props.content}</Markdown>
      </div>
    </div>
  );
};

export default Answer;
