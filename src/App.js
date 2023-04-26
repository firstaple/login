import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth/firebase/initialize";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "./auth/redux/slice/tockenSlice";
import { useEffect } from "react";

function App() {
  const tocken = useSelector((state) => state.tocken.tocken);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        dispatch(setUser(user.accessToken));
        console.log("로그인 상태입니다.");
      } else {
        // User is signed out
        // ...
        dispatch(clearUser());
        console.log("로그아웃 상태입니다.");
      }
    });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={tocken ? <Navigate replace to={"/myPage"} /> : <Login />}
      />
      <Route path="/signUp" element={<SignUp />} />
      <Route
        path="/myPage"
        element={tocken ? <Mypage /> : <Navigate replace to={"/"} />}
      />
    </Routes>
  );
}

export default App;
