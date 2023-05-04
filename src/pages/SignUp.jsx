import { Link, useNavigate } from "react-router-dom";
import styles from "../css/SignUp.module.css";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../auth/firebase/initialize";
import { useState } from "react";
import PlatformLogin from "../component/PlatformLogin";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/redux/slice/userSlice";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputName = (e) => {
    setDisplayName(e.target.value);
  };

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const inputConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const loginNow = (e) => {
    setLogin(e.target.checked);
  };

  const sendUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
        updateProfile(auth.currentUser, {
          displayName: displayName,
        });
        if (!login) {
          signOut(auth);
          navigate("/");
        } else {
          window.sessionStorage.setItem("user", JSON.stringify(user));
          dispatch(
            setUser({
              tocken: user.accessToken,
              email: user.email,
              emailVerified: user.emailVerified,
              name: user.displayName,
              photoURL: user.photoURL,
            })
          );
        }
        alert("Your registration is complete");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert("Registration failed. Please confirm your email or password");
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.signUp_form}>
        <h1>Sign-Up</h1>
        <span>Do you already have an ID?</span>
        <br />
        <Link to="/">Login</Link>
        <form action="" onSubmit={sendUser}>
          <label>user name</label>
          <input
            type="text"
            placeholder="your name"
            required
            onChange={inputName}
          />
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
          <label>confirm password</label>
          <input
            type="password"
            placeholder="confirm password"
            required
            onChange={inputConfirm}
          />
          <div>
            <input type="checkbox" onChange={loginNow} />
            <label>Log in right away</label>
          </div>
          {password === confirm && password ? <button>Sign-Up</button> : ""}
        </form>
        <div className={styles.another_signUp}>
          <span className={styles.another_signUp_title}>
            Start with Google or Facebook
          </span>
          <div className={styles.another_signUp_title_border}></div>
          <div className={styles.another_signUp_platform}>
            <PlatformLogin />
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};
export default SignUp;
