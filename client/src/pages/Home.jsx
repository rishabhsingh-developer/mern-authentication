import { useSelector } from "react-redux";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser, "currentuser");
  return <div>{currentUser.username}</div>;
}
