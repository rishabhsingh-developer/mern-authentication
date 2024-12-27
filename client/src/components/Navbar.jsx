import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-gray-300 px-[20px] py-[20px]">
      <Link to="/">
        <h1 className="text-4xl font-bold font-mono ">Auth App</h1>
      </Link>
      <ul className="flex justify-center items-center gap-[20px] text-lg">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/signin">
          <li>Sign-in</li>
        </Link>
      </ul>
    </nav>
  );
}
