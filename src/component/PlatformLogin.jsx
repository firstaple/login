import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../auth/firebase/initialize";
import { useDispatch } from "react-redux";
import { setUser } from "../auth/redux/slice/userSlice";
import styles from "../css/PlatformLogin.module.css";

const PlatformLogin = () => {
  const dispatch = useDispatch();
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
  return (
    <>
      <button className={styles.platform_google} onClick={googleLogin}>
        Google
      </button>
      <button className={styles.platform_facebook}>Facebook</button>
    </>
  );
};

export default PlatformLogin;
