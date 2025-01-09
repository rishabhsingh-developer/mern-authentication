import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, err } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        return dispatch(signInFailure(data));
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log(error, "error");
    }
  };
  return (
    <div className="p-3 flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <div className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg sm:w-[500px] w-[300px]"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg sm:w-[500px] w-[300px]"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          onClick={handleSubmit}
          className="bg-slate-700 sm:w-[500px] w-[300px] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth />
      </div>

      <div className="flex gap-2 mt-5">
        <p>Dont Have an account?</p>
        <Link to="/signup">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-5">
        {err ? err.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
}
