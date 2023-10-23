import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl">Threads:</h1>
      <Link
        to={{
          pathname: "/thread",
          search: "?id=1",
        }}
      >
        Thread 1
      </Link>
      <Link
        to={{
          pathname: "/thread",
          search: "?id=2",
        }}
      >
        Thread 2
      </Link>
    </div>
  );
};
export default Home;