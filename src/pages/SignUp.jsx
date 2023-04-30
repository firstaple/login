import { Link } from "react-router-dom";
import styles from "../css/SignUp.module.css";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, provider } from "../auth/firebase/initialize";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [login, setLogin] = useState(false);

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
        if (!login) {
          signOut(auth);
        }
        alert("가입완료");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert("가입실패인데 이유를 알아보련?");
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
          <span className={styles.another_signUp_title}>of sign-up with</span>
          <div className={styles.another_signUp_title_border}></div>
          <div className={styles.another_signUp_platform}>
            <button className={styles.platform_google}>Google</button>
            <button className={styles.platform_facebook}>Facebook</button>
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};
export default SignUp;
