import { auth } from "../auth/firebase/initialize";
import { useSelector } from "react-redux";
import EditUser from "../component/EditUser";
import AuthEmail from "../component/AuthEmail";

const Mypage = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      {user.emailVerified ? (
        <EditUser auth={auth} />
      ) : (
        <AuthEmail auth={auth} />
      )}
    </>
  );
};

export default Mypage;
