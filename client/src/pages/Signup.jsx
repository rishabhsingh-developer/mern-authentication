import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../components/Oauth";
export default function Signup() {
  const [data, setData] = useState({});
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.id]: e.target.value });
  }

  async function handleSignup() {
    try {
      setLoading(true);
      setErr(false);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const data3 = await res.json();
      console.log(data3);
      setLoading(false);
      if (data3.statusCode === 500) {
        return setErr(true);
      }
      navigate("/");
    } catch (error) {
      setErr(true);
      console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-4xl font-mono font-bold mt-[30px]">Signup</h1>
      <input
        type="text"
        id="username"
        placeholder="username"
        className="px-2 py-3 w-[500px]  bg-gray-100 rounded-xl"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="email"
        id="email"
        className="px-2 py-3 w-[500px] bg-gray-100 rounded-xl"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="password"
        id="password"
        className="px-2 py-3 w-[500px]  bg-gray-100 rounded-xl"
        onChange={handleChange}
      />
      <button
        className="py-3 w-[500px] bg-black rounded-xl text-white"
        onClick={handleSignup}
      >
        {loading ? "Loading..." : "SIGN UP"}
      </button>
      <Oauth />
      <div className="flex gap-5 w-[500px]">
        <p className="text-lg">Have an account ? </p>
        <Link to="/signin">
          <p className="text-blue-500">Sign in</p>
        </Link>
      </div>
      <p className="text-red-500 font-mono text-lg">
        {err ? "SOMETHIG WENT WRONG" : ""}
      </p>
    </div>
  );
}
