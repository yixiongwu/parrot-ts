import Thread from "./Thread";

const searchParams = new URLSearchParams(window.location.search);
const id = Number(searchParams.get("id"));

const App = () => {
  return <div className="App">{id > 0 && <Thread id={id} />}</div>;
};

export default App;