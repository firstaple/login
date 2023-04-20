import { Link } from "react-router-dom";
import styles from "../css/Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.login_form}>
        <h1>Login</h1>
        <span>Doesn't have an account yet?</span>
        <br />
        <Link to="/signUp">Sign Up</Link>
        <form action="">
          <label>email</label>
          <input type="email" placeholder="your@email.com" required />
          <label>password</label>
          <input type="password" placeholder="your password" required />
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
