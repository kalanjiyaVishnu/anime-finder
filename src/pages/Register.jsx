import { useContext } from "react";
import { FireBaseContext } from "../context/fireBaseContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
const Register = () => {
  const { firebase } = useContext(FireBaseContext);

  const [user] = useAuthState(firebase.auth());
  const loc = useLocation();
  console.log(loc);
  return (
    <div>
      <h1>in the register page</h1>
      <button
        className="py-1 px-4 rounded-md bg-gray-800
    text-white-light text-center"
        onClick={() => {
          const provider = new firebase.auth.GoogleAuthProvider();
          firebase.auth().signInWithPopup(provider);
          console.log(firebase);
        }}
      >
        sigin in
      </button>
      <button
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        signput
      </button>
      {user && <div>{user.displayName}</div>}
    </div>
  );
};
export default Register;
