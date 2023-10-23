import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Thread from "./Thread";
import HeadComponent from "./Components/Head";

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <HeadComponent />
      <div className="flex flex-1 overflow-auto">
        <main className="flex flex-col p-6 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thread" element={<Thread />} />
          </Routes>
        </main>
        <aside className="w-64 p-6 border-l">{/* Sidebar content... */}</aside>
      </div>
    </div>
  );
};

export default App;
