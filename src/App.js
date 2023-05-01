import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase/initialize";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./auth/redux/slice/userSlice";
import { useEffect } from "react";

function App() {
  const user = useSelector((state) => state.user);
  const tocken = user.tocken;
  const dispatch = useDispatch();
  const sessionUser = window.sessionStorage.getItem("user");
  const localUser = window.localStorage.getItem("user");
  const googleUSer = window.localStorage.getItem("google");

  console.log(auth);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && (sessionUser || localUser || googleUSer)) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // ...
        dispatch(
          setUser({
            tocken: user.accessToken,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.displayName,
            photoURL: user.photoURL,
          })
        );
        console.log("You are logged in.");
      } else {
        // User is signed out
        // ...
        dispatch(clearUser());
        console.log("You are logged out.");
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={tocken ? <Navigate replace to={"/myPage"} /> : <Login />}
      />
      <Route
        path="/signUp"
        element={tocken ? <Navigate replace to={"/myPage"} /> : <SignUp />}
      />
      <Route
        path="/myPage"
        element={!tocken ? <Navigate replace to={"/"} /> : <Mypage />}
      />
    </Routes>
  );
}

export default App;
