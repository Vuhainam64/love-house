import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../context/actions/authActions";
import { SET_USER_NULL } from "../../../context/actions/userActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignout = () => {
    dispatch(logout());
    dispatch(SET_USER_NULL());
    navigate("/auth");
  };

  return (
    <div className="bg-baseOrange text-white">
      <h1>hi</h1>
      <button onClick={handleSignout}>Logout</button>
    </div>
  );
}
