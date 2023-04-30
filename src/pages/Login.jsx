import { Link } from "react-router-dom";
import styles from "../css/Login.module.css";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../auth/firebase/initialize";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/redux/slice/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveUser, setSaveUser] = useState();
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
        alert("로그인을 환영한다.");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("뭐가 안맞다 닝겐.");
      });
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        dispatch(
          setUser({
            tocken: token,
            email: user.email,
            emailVerified: user.emailVerified,
            name: user.displayName,
            photoURL: user.photoURL,
          })
        );
        window.localStorage.setItem("google", JSON.stringify(user));
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const a = () => {
    signOut(auth);
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
          <Link>Forgot Password?</Link>
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
            <button className={styles.platform_google} onClick={googleLogin}>
              Google
            </button>
            <button className={styles.platform_facebook} onClick={a}>
              Facebook
            </button>
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};

export default Login;
