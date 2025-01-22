import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
export default function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser.profilePic, "profilePic");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <nav className=" bg-gray-300 px-[20px] py-[20px]">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="sm:text-4xl text-2xl font-bold font-mono ">Estate</h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
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
