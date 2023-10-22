import { FC, useState, useEffect } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { upvoteQuestion, downvoteQuestion } from "../APIs";

interface QuestionProps {
  id: number;
  title: string;
  content: string;
  upvote: number;
  downvote: number;
}

const Question: FC<QuestionProps> = (props) => {
  const [questionVote, setQuestionVote] = useState<number>(0);

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

  useEffect(() => {
    setQuestionVote(
      props.upvote > props.downvote ? props.upvote - props.downvote : 0
    );
  }, [props.upvote, props.downvote]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{props.title}</h1>
      <div className="flex justify-between">
        <div className="ml-4 flex flex-col items-center">
          <ArrowUpIcon
            className="h-5 w-5 mr-2"
            onClick={() => handleQuestionUpvote(props.id)}
          />
          <span>{questionVote}</span>
          <ArrowDownIcon
            className="h-5 w-5 mr-2"
            onClick={() => handleQuestionDownvote(props.id)}
          />
        </div>
        <p className="flex-1">{props.content}</p>
      </div>
    </div>
  );
};

export default Question;