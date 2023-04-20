import { Link } from "react-router-dom";
import styles from "../css/SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.signUp_form}>
        <h1>Sign-Up</h1>
        <span>Do you already have an ID?</span>
        <br />
        <Link to="/">Login</Link>
        <form action="">
          <label>email</label>
          <input type="email" placeholder="your@email.com" required />
          <label>password</label>
          <input type="password" placeholder="your password" required />
          <label>confirm password</label>
          <input type="password" placeholder="confirm password" required />
          <div>
            <input type="checkbox" />
            <label>Log in right away</label>
          </div>
          <button>Sign-Up</button>
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
