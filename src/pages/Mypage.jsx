import styles from "../css/Mypage.module.css";

const Mypage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.myPage_form}>
        <h1>My page</h1>
        <span>Check the user information</span>
        <br />
        <form action="">
          <label>password</label>
          <input type="password" placeholder="your password" required />
          <label>Modify Password</label>
          <input type="password" placeholder="your password" required />
          <label>Confirm modify Password</label>
          <input type="password" placeholder="your password" required />
          <div>
            <input type="checkbox" />
            <label>Do you want to modify it?</label>
          </div>
          <button>modify</button>
        </form>
        <div className={styles.logout}>
          <span className={styles.logout_title}>logout</span>
          <div className={styles.logout_title_border}></div>
          <div className={styles.logout_platform}>
            <button className={styles.platform_google}>logout</button>
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};

export default Mypage;
