import { useEffect, Suspense, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";

import Routers from "./routes/Routers";
import { getAccountById, getNewToken } from "./api";
import { SET_USER, SET_USER_NULL } from "./context/actions/userActions";
import { logout, setTokens, setUserRole } from "./context/actions/authActions";
import { MutatingDots } from "./components";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        const accountId = decodedToken?.AccountId;

        dispatch(
          setUserRole(
            decodedToken[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ]
          )
        );

        const currentTime = new Date().getTime() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log("Token expired. Refreshing token...");
          const newTokenResult = await getNewToken(accountId, refreshToken);
          if (newTokenResult) {
            console.log("New token received: ", newTokenResult);
            const newAccessToken = newTokenResult.result.data.accessToken;
            const newRefreshToken = newTokenResult.result.data.refreshToken;
            dispatch(setTokens(newAccessToken, newRefreshToken, accountId));
          } else {
            dispatch(logout());
            dispatch(SET_USER_NULL());
          }
        } else {
          console.log("Bearer ", accessToken);

          if (accountId) {
            const accountData = await getAccountById(accountId, accessToken);
           // console.log("account data: ", accountData.result.data);
            dispatch(SET_USER(accountData.result.data));
          } else {
            console.log("Invalid account ID. Handle accordingly.");
          }
        }
      } catch (err) {
        console.error("Error decoding token: ", err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("No access token received.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="absolute z-30 bg-white bg-opacity-20 w-full h-full flex items-center justify-center">
        <MutatingDots />
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen h-auto ">
      <ToastContainer position="top-right" autoClose={2000} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Routers />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
