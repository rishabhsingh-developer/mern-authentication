import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
export default function Oauth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      className="bg-red-700 sm:w-[500px] w-[300px]  text-white py-3  rounded-lg"
      onClick={handleAuth}
    >
      CONTINUE WITH GOOGLE
    </button>
  );
}
