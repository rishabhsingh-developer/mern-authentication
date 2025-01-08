import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";

export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.profilePic, "profilePic");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" bg-gray-300 px-[20px] py-[20px]">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-4xl font-bold font-mono ">Auth App</h1>
        </Link>
        <ul className=" sm:flex justify-center items-center  hidden gap-[20px] text-lg">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to={`${currentUser ? "/profile" : "/signin"}`}>
            {currentUser ? (
              <img
                src={currentUser.profilePic}
                alt="profile"
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <li>Sign In</li>
            )}
          </Link>
        </ul>
        <div className="sm:hidden ">
          <FaBars size={24} onClick={() => setIsOpen(!isOpen)} />
        </div>

        {isOpen && (
          <ul className="absolute top-[80px] right-0  border border-black w-full  text-lg bg-gray-300">
            <div className="flex flex-col items-center gap-5 ">
              <Link to="/" onClick={() => setIsOpen(false)}>
                <li>Home</li>
              </Link>
              <Link to="/about" onClick={() => setIsOpen(false)}>
                <li>About</li>
              </Link>
              <Link
                to={`${currentUser ? "/profile" : "/signin"}`}
                onClick={() => setIsOpen(false)}
              >
                {currentUser ? (
                  <img
                    src={currentUser.profilePic}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                ) : (
                  <li>Sign In</li>
                )}
              </Link>
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
}
