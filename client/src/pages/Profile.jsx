import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteUserSuccess, signOut } from "../redux/user/userSlice";
import { useRef, useState } from "react";
import { useEffect } from "react";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [userListings, setUserListings] = useState([]);

  async function handleFileUpload(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "image_preset");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/ddkngkmm4/image/upload",
      data
    );
    const { secure_url } = res.data;
    setFormData({ ...formData, profilePic: secure_url });
    console.log(secure_url);
  }

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const dispatch = useDispatch();

  const ref = useRef(null);

  const { currentUser, error } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
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

  const handleShowListings = async () => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      setUserListings(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <input
        type="file"
        ref={ref}
        id="profilePic"
        hidden
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <img
        onClick={() => ref.current.click()}
        src={
          currentUser.profilePic ||
          `https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg`
        }
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
        onClick={handleUpdate}
      >
        UPDATE
      </button>

      <button className="bg-green-600 rounded-lg text-white p-3">
        <Link to="/create-listing">CREATE-LISTING</Link>
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
      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
