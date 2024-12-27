import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-4xl font-mono font-bold mt-[30px]">Signup</h1>
      <input
        type="text"
        id="username"
        placeholder="username"
        className="px-2 py-3 w-[500px]  bg-gray-100 rounded-xl"
      />
      <input
        type="text"
        placeholder="email"
        id="email"
        className="px-2 py-3 w-[500px] bg-gray-100 rounded-xl"
      />
      <input
        type="text"
        placeholder="password"
        id="password"
        className="px-2 py-3 w-[500px]  bg-gray-100 rounded-xl"
      />
      <button className="py-3 w-[500px] bg-black rounded-xl text-white">
        SIGN UP
      </button>
      <div className="flex gap-5 w-[500px]">
        <p className="text-lg">Have an account ? </p>
        <Link to="/signin">
          <p className="text-blue-500">Sign in</p>
        </Link>
      </div>
    </div>
  );
}
