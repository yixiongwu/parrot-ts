import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Thread from "./Thread";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thread" element={<Thread />} />
      </Routes>
    </div>
  );
};

export default App;
