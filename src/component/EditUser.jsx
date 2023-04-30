import { useState } from "react";
import styles from "../css/EditUser.module.css";
import { deleteUser, sendPasswordResetEmail, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EditUser = ({ auth }) => {
  const [changeEmailState, setChangeEmailState] = useState(false);
  const user = useSelector((state) => state.user);
  const email = user.email;
  const name = user.name;
  const photoURL = user.photoURL;

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

  const deleteUserBtn = () => {
    const confirmDelete = window.confirm("진짜 삭제할래?");
    if (confirmDelete && user.emailVerified) {
      deleteUser(auth.currentUser)
        .then(() => {
          // User deleted.
          window.sessionStorage.removeItem("user");
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("google");
          console.log("Succes");
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log(error);
        });
    } else {
      alert("Not Auth Email");
    }
  };

  const clickLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        window.sessionStorage.removeItem("user");
        window.localStorage.removeItem("user");
        window.localStorage.removeItem("google");
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
          {name ? (
            <div style={{ display: "flex" }}>
              <span>환영합니다! {name}</span>
              <img
                src={photoURL}
                style={{ borderRadius: "50%", width: "10%", marginLeft: "2%" }}
              />
            </div>
          ) : (
            ""
          )}
          <Link onClick={sendChangePassword}>
            Change Password <span>{changeEmailState ? "✅" : ""}</span>
          </Link>
          <Link onClick={deleteUserBtn}>Delete user</Link>
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

export default EditUser;
