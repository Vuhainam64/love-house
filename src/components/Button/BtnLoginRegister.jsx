import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UserProfileDetails from "../Navbar/UserProfileDetails";
export default function BtnLoginRegister() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <>
      {!user ? (
        <NavLink to={"/auth"}>
          <button className="px-4 uppercase bg-white text-baseDark font-bold rounded-md my-6 mr-6 mx-auto py-3">
            Sign In
          </button>
        </NavLink>
      ) : (
        <div>
          <UserProfileDetails />
        </div>
      )}
    </>
  );
}
