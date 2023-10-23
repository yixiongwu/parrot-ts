import { Link } from "react-router-dom";

const Head = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500 text-white">
      <h1>My App</h1>
      <div className="flex items-center">
        <input
          className="mr-6 rounded p-2"
          type="text"
          placeholder="Search..."
        />
        <Link to="/login" className="mr-6">
          Login
        </Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Head;