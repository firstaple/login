import { Link } from "react-router-dom";
import styles from "../css/Login.module.css";
import { useState } from "react";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../auth/firebase/initialize";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../auth/redux/slice/userSlice";
import PlatformLogin from "../component/PlatformLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveUser, setSaveUser] = useState();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const setLocal = (e) => {
    setSaveUser(e.target.checked);
  };

  const sendUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (saveUser) {
          window.localStorage.setItem("user", JSON.stringify(user));
        } else {
          window.sessionStorage.setItem("user", JSON.stringify(user));
        }
        dispatch(
          setUser({
            tocken: user.accessToken,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.displayName,
            photoURL: user.photoURL,
          })
        );
        alert("Welcome to login.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Please confirm your email or password");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.login_form}>
        <h1>Login</h1>
        <span>Doesn't have an account yet?</span>
        <br />
        <Link to="/signUp">Sign Up</Link>
        <form action="" onSubmit={sendUser}>
          <label>email</label>
          <input
            type="email"
            placeholder="your@email.com"
            required
            onChange={inputEmail}
          />
          <label>password</label>
          <input
            type="password"
            placeholder="your password"
            required
            onChange={inputPassword}
          />
          <div>
            <input type="checkBox" onChange={setLocal} />
            <label>Remember me</label>
          </div>
          <button>Login</button>
        </form>
        <div className={styles.another_login}>
          <span className={styles.another_login_title}>of login with</span>
          <div className={styles.another_login_title_border}></div>
          <div className={styles.another_login_platform}>
            <PlatformLogin />
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};

export default Login;
