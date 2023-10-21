import { useState, useEffect } from "react";
import axios from "axios";

import { Result, Question } from "./type";

export default function App() {
  const [question, setQuestion] = useState<Question>();
  useEffect(() => {
    const fetch = async () => {
      const ret = await axios.get<Result<Question>>("/api/question/get?id=1");
      const result = ret.data;
      setQuestion(result.data);
    };
    fetch();
  }, []);

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world! {question?.title}
    </h1>
  );
}
