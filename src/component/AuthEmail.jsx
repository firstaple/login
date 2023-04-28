import styles from "../css/AuthEmail.module.css";
import { useState } from "react";
import { sendEmailVerification } from "firebase/auth";
import { Link } from "react-router-dom";

const AuthEmail = ({ auth }) => {
  const [authEmailState, setAuthEmailState] = useState(false);

  const sendAuthEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
        setAuthEmailState(true);
        alert("Send Email!");
      })
      .catch((error) => {
        alert("Mismatched email!");
      });
  };

  const navigateEdit = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.myPage_form}>
        <div className={styles.userData_edit}>
          <h1>My page</h1>
          <span>Check the user information</span>
          <Link onClick={sendAuthEmail}>
            Send Auth Email <span>{authEmailState ? "✅" : ""}</span>
          </Link>
        </div>

        <div className={styles.Auth}>
          <span className={styles.Auth_title}>Auth</span>
          <div className={styles.Auth_title_border}></div>
          <div className={styles.Auth_platform}>
            <button className={styles.platform_google} onClick={navigateEdit}>
              Auth
            </button>
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};

export default AuthEmail;
