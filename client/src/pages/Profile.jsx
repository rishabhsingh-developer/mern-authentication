import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { deleteUserSuccess, signOut } from "../redux/user/userSlice";
import { useState } from "react";

export default function Profile() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});

  const { currentUser, error } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleClick = async () => {
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Check if the response status is in the successful range
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data, "Response data");
    } catch (err) {
      console.error("Error occurred:", err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <img
        src={currentUser.profilePic}
        alt="profilepic"
        className="h-[100px] w-[100px] self-center rounded-[50%]"
      />
      <input
        defaultValue={currentUser.username}
        type="text"
        id="username"
        placeholder="Username"
        className="bg-slate-100 rounded-lg p-3"
        onChange={handleChange}
      />
      <input
        defaultValue={currentUser.email}
        type="email"
        id="email"
        placeholder="Email"
        className="bg-slate-100 rounded-lg p-3"
        onChange={handleChange}
      />
      <input
        type="text"
        id="password"
        placeholder="password"
        className="bg-slate-100 rounded-lg p-3"
        onChange={handleChange}
      />
      <button
        className="bg-gray-600 rounded-lg text-white p-3"
        onClick={handleClick}
      >
        UPDATE
      </button>

      <div className="flex justify-between  mt-5 ">
        <span className="text-red-700 cursor-pointer" onClick={handleDelete}>
          Delete
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer ">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error && "Something went wrong!"}</p>
      <p></p>
    </div>
  );
}
