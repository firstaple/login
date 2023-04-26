import { Link, useNavigate } from "react-router-dom";
import styles from "../css/Login.module.css";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase/initialize";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };
  const inputPassword = (e) => {
    setPassword(e.target.value);
  };

  const sendUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("로그인을 환영한다.");
        navigate("/myPage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("뭐가 안맞다 닝겐.");
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
          <Link>Forgot Password?</Link>
          <div>
            <input type="checkBox" />
            <label>Remember me</label>
          </div>
          <button>Login</button>
        </form>
        <div className={styles.another_login}>
          <span className={styles.another_login_title}>of login with</span>
          <div className={styles.another_login_title_border}></div>
          <div className={styles.another_login_platform}>
            <button className={styles.platform_google}>Google</button>
            <button className={styles.platform_facebook}>Facebook</button>
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};

export default Login;
