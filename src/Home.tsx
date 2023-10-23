import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/thread?id=1" className="block p-4 bg-green-400 text-white rounded-lg hover:bg-green-600 transition-colors">
        <h2 className="text-xl">Thread 1</h2>
        <p>Some description about this thread...</p>
      </Link>
      <Link to="/thread?id=2" className="block p-4 bg-green-400 text-white rounded-lg hover:bg-green-600 transition-colors mt-4">
        <h2 className="text-xl">Thread 2</h2>
        <p>Some description about this thread...</p>
      </Link>
    </div>
  );
};

export default Home;