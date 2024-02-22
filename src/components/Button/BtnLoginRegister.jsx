import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import UserProfileDetails from "../Navbar/UserProfileDetails";
export default function BtnLoginRegister() {
  const user = useSelector((state) => state?.user?.user);
  return (
    <>
      {!user ? (
        <NavLink to={"/auth"}>
          <button className="bg-baseGreen text-white px-5 py-2 rounded-full hover:bg-main transition  ease-in-out">
            Sign in
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
