import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import styles from "../css/Mypage.module.css";
import { auth } from "../auth/firebase/initialize";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Mypage = () => {
  const [authEmailState, setAuthEmailState] = useState(false);
  const [changeEmailState, setChangeEmailState] = useState(false);
  const user = useSelector((state) => state.user);
  const email = user.email;

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

  const sendChangePassword = () => {
    if (user.emailVerified) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          setChangeEmailState(true);
          alert("Send Email!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          alert("Mismatched email!");
        });
    } else {
      alert("Not Auth Email");
    }
  };

  const clickLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.myPage_form}>
        <div className={styles.userData_edit}>
          <h1>My page</h1>
          <span>Check the user information</span>
          <br />
          {user.emailVerified ? (
            <Link>Already Auth</Link>
          ) : (
            <Link onClick={sendAuthEmail}>
              Send Auth Email {authEmailState ? "✅" : ""}
            </Link>
          )}

          <br />
          <Link onClick={sendChangePassword}>
            Change Password {changeEmailState ? "✅" : ""}
          </Link>
          <br />
          <Link>Delete user</Link>
        </div>

        <div className={styles.logout}>
          <span className={styles.logout_title}>logout</span>
          <div className={styles.logout_title_border}></div>
          <div className={styles.logout_platform}>
            <button className={styles.platform_google} onClick={clickLogout}>
              logout
            </button>
          </div>
        </div>
      </div>
      <img src={require("../login-img.png")}></img>
    </div>
  );
};

export default Mypage;
